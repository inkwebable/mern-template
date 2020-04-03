import jwt from 'jsonwebtoken';
import User from '../models/user';
import generateAuthCookies from "../utils/generateAuthCookies";
import keys from '../config/keys'

// const authenticate = async (req, res, next) => {
//   const { token } = req.cookies;
//
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET, { maxAge: process.env.DB_ENV === 'testing' ? '5min' : '1d'}, (err, decoded) => {
//       if (err && err.name === 'TokenExpiredError') {
//         res.status(401).send({ error: 'Please authenticate. Token expired.' });
//       }
//
//       return decoded;
//     });
//
//     const user = await User.findOne({ _id: decoded.id });
//
//     if (!user) {
//       return res.status(401).send({error: 'User Not Found'});
//     }
//
//     req.token = token;
//     req.user = user;
//     res.locals.user = user;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({ error: 'Please authenticate. Token Invalid.' });
//   }
// };

const authenticate = async (req, res, next) => {
  // Find JWT token in headers
  const tokenHeader = req.headers["authorization"];

  // Find JWT token in cookies
  const tokenPayloadCookie = req.cookies['_p'];
  const tokenSignatureCookie = req.cookies['_s'];

  let tokenStr = null;

  if (tokenPayloadCookie && tokenSignatureCookie) { // Cookie processing
    // Assemble 2 cookies then validate
    tokenStr = `${tokenPayloadCookie}.${tokenSignatureCookie}`;
  } else if (tokenHeader) { // Header Processing
    // Bearer yhju7uyu...
    const arrayHeader = tokenHeader.split(" ");

    if (arrayHeader[0] !== "Bearer") {
      // Invalid token type error. Token should be a 'Bearer' Token
      return res.status(403).send("Access Denied: Invalid Token");

    } else {
      tokenStr = arrayHeader[1];
    }
  } else {
    return res.status(403).send("Access Denied: Invalid Credentials");
  }

  // Check if we have something to validate
  if (!tokenStr) {
    return res.status(403).send({ error: 'Please authenticate. Token Invalid.' });
  } else {

    await jwt.verify(tokenStr, keys.jwtSecret, { maxAge: keys.dbEnv === 'testing' ? '4min' : '1d'}, async (err, decoded) => {
      if (err) {
        console.log('jwt verify err', err);
        // make sure cookies are dead
        res = generateAuthCookies(tokenStr, res, 0);

        if (err.name === 'TokenExpiredError') {
          // @TODO refresh token?
          return res.status(403).send({error: 'Please authenticate. Token expired.'});
        }

        // @TODO let client handle redirect & message
        // res.redirect(403, '/login');
        // next();
        return res.status(403).send({error: err});
      }

      if (decoded) {
        try {
          const user = await User.findOne({ _id: decoded.id });

          if (!user) {
            return res.status(404).send({error: 'User Not Found'});
          }

          res = generateAuthCookies(tokenStr, res);

          req.user = user;
          res.locals.user = user;
          next();
        } catch (error) {
          console.log('auth catch',error);
          return res.status(400).send({ error });
        }
      }

      // authorise not handled here
      // if (credentials.length > 0) {
      //   if (decoded.scopes && decoded.scopes.length && credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)) {
      //     next();
      //   } else {
      //     return res.status(403).send("Error: Access Denied, no credentials");
      //   }
      // } else {
      //   console.log("no credentials required for route, just authentication");
      //   // User is authenticated and there are no credentials to check for authorization
      //   next();
      // }
    });
  }
};


export { authenticate };
