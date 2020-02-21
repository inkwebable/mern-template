import jwt from 'jsonwebtoken';

const generateToken = (id, username, role) => {
  const token = jwt.sign({ id, username, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return token;
};

const generateRefreshToken = (id, username, role) => {
  const refreshToken = jwt.sign({ id, username, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return refreshToken;
};

export { generateToken, generateRefreshToken };
