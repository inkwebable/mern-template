import jwt from 'jsonwebtoken';
import { v1 as uuidv1} from 'uuid';
import keys from '../config/keys';

const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, keys.jwtSecret, {
    expiresIn: keys.dbEnv === 'testing' ? '1min' : '1d'
  });

  return token;
};

const generateRefreshToken = (id, role) => {

  const mockDB = { tokens: []};

  // check if there are 5 or more refresh tokens,
  const userRefreshTokens = mockDB.tokens.filter(token => token.userId === id);

  // remove if more than 5
  if (userRefreshTokens.length >= 5) {
    mockDB.tokens = mockDB.tokens.filter(token => token.userId !== id);
  }

  const refreshToken = jwt.sign({ id, role }, keys.jwtRefreshSecret, {
    expiresIn: keys.dbEnv === 'testing' ? '1h' : '1d',
  });

  // add to db
  mockDB.tokens.push({
    id: uuidv1(),
    userId: id,
    refreshToken
  });

  return refreshToken;
};

export { generateToken, generateRefreshToken };
