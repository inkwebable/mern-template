import jwt from 'jsonwebtoken';

const generateToken = (id, email, role) => {
  const token = jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return token;
};

const generateRefreshToken = (id, email, role) => {
  const refreshToken = jwt.sign({ id, email, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
  });

  return refreshToken;
};

export { generateToken, generateRefreshToken };
