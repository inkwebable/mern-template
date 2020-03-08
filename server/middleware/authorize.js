import dotenv from 'dotenv';
import { User } from '../models';

dotenv.config();

// @TODO replace
// const users = [
//   {
//     id: 1,
//     username: 'john',
//     email: 'test1@gmail.com',
//     password: 'password123admin',
//     role: 'admin',
//   },
//   {
//     id: 2,
//     username: 'anna',
//     email: 'test2@gmail.com',
//     password: 'password123member',
//     role: 'member',
//   },
//   {
//     id: 3,
//     username: 'intruder',
//     email: 'test3@gmail.com',
//     password: 'password123intruder',
//     role: '',
//   },
// ];

const authorise = (roles) => {

  return async (req, res, next) => {
    // get id from previous middleware (authenticate)
    const { id, role } = res.locals.user;

    try {
      const user = await User.findOne({ _id: id });

      // const user = users.find(u => {
      //   return u.username === username && u.id === id;
      // });

      if (!user) {
        throw new Error('User not found');
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }

    if (roles.includes(role)) {
      next();
    } else {
      return res.status(401).send({ error: 'You do not have authorisation.' });
    }
  };
};

export { authorise };
