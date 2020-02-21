import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';

dotenv.config();

// @TODO replace
const users = [
  {
    id: 1,
    username: 'john',
    email: 'test1@gmail.com',
    password: 'password123admin',
    role: 'admin',
  },
  {
    id: 2,
    username: 'anna',
    email: 'test2@gmail.com',
    password: 'password123member',
    role: 'member',
  },
  {
    id: 3,
    username: 'intruder',
    email: 'test3@gmail.com',
    password: 'password123intruder',
    role: '',
  },
];

const authenticate = async (req, res, next) => {
  const token = req.cookies['token'];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    const user = users.find(u => {
      return u.username === decoded.username && u.id === decoded.id;
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export { authenticate };
