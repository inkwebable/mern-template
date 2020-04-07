import jwt from 'jsonwebtoken';
import User from '../../models/user';
import generateAuthCookies from '../../utils/generateAuthCookies';
import keys from '../../config/keys';

const authenticate = async (req, res, next) => {
  // Find JWT token in headers
  const tokenHeader = req.headers.authorization;

  // Find JWT token in cookies
  const tokenPayloadCookie = req.cookies._p;
  const tokenSignatureCookie = req.cookies._s;

  let decoded;
  let tokenStr;
  let bearer;

  if (!(tokenPayloadCookie && tokenSignatureCookie) && !tokenHeader) {
    return res.status(403).send('Access Denied: Missing token');
  }

  if (tokenPayloadCookie && tokenSignatureCookie) {
    // Cookie processing
    // Assemble 2 cookies then validate
    tokenStr = `${tokenPayloadCookie}.${tokenSignatureCookie}`;
  }

  if (tokenHeader) {
    // Header Processing
    const arrayHeader = tokenHeader.split(' ');

    if (arrayHeader[0] !== 'Bearer') {
      // Invalid token type error. Token should be a 'Bearer' Token
      return res.status(403).send('Access Denied: Missing header');
    }

    [bearer, tokenStr] = arrayHeader;
  }

  try {
    decoded = await jwt.verify(tokenStr, keys.jwtSecret, { maxAge: keys.dbEnv === 'testing' ? '8h' : '60min' });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      // make sure cookies are dead
      res = generateAuthCookies(tokenStr, res, 0);

      if (err.name === 'TokenExpiredError') {
        // @TODO refresh token?
        return res.status(403).send({ error: 'Please authenticate. Token expired.' });
      }

      return res.status(403).send({ error: err.message });
    }

    next(err);
  }

  try {
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).send({ error: 'User Not Found' });
    }

    res = generateAuthCookies(tokenStr, res);

    req.user = user;
  } catch (err) {
    return res.status(400).send({ error: err });
  }

  return next();
};

export default authenticate;
