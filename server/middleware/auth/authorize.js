import dotenv from 'dotenv';

import User from '../../models/user/User';

dotenv.config();

const authorise = (roles) => {
  return async (req, res, next) => {
    // get id from previous middleware (authenticate)
    const { id, role } = req.user;

    try {
      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).send({ error: 'User Not Found' });
      }
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }

    if (roles.includes(role)) {
      return next();
    }

    return res.status(401).send({ error: 'You do not have authorisation.' });
  };
};

export default authorise;
