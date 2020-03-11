import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return token;
};

const generateRefreshToken = (id, role) => {
  const refreshToken = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return refreshToken;
};

export { generateToken, generateRefreshToken };
