import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const authorise = (roles) => {

  return async (req, res, next) => {
    // get id from previous middleware (authenticate)
    const { id, role } = res.locals.user;

    try {
      const user = await User.findOne({ _id: id });

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
