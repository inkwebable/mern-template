import jwt from 'jsonwebtoken';
import { v1 as uuidv1 } from 'uuid';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_MAX_AGE ? process.env.JWT_MAX_AGE : '1h',
  });
};

const generateRefreshToken = (id, role) => {
  const mockDB = { tokens: [] };

  // check if there are 5 or more refresh tokens,
  const userRefreshTokens = mockDB.tokens.filter(token => token.userId === id);

  // remove if more than 5
  if (userRefreshTokens.length >= 5) {
    mockDB.tokens = mockDB.tokens.filter(token => token.userId !== id);
  }

  const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_MAX_AGE ? process.env.JWT_MAX_AGE : '1h',
  });

  // add to db
  mockDB.tokens.push({
    id: uuidv1(),
    userId: id,
    refreshToken,
  });

  return refreshToken;
};

export { generateToken, generateRefreshToken };
