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

const authorise = (roles) => {

  return async (req, res, next) => {
    // get id from previous middleware
    const { id, username, role } = res.locals.user;

    try {
      // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

      const user = users.find(u => {
        return u.username === username && u.id === id;
      });

      if (!user) {
        throw new Error();
      }

    } catch (error) {
      res.status(400).send({ error });
    }

    if(roles.includes(role)) {
      next();
    } else {
      res.status(401).send({ error: 'You do not have authorisation.' });
    }
  }
};

export { authorise };
