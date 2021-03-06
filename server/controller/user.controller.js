import express from 'express';

import User from '../models/user/User';

const userController = express.Router();

userController.get('/', (req, res) => {
  try {
    return res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    return res.json({ error });
  }
});

userController.patch('/update', (req, res) => {
  // sanitizing handled by mongoSanitize
  if (!req.body.name || !req.user) {
    return res.status(422).send({ error: 'missing parameter(s)' });
  }

  try {
    User.findOneAndUpdate({ _id: req.user.id }, { name: req.body.name }, { new: true, runValidators: true })
      .then((data) => {
        return res.status(202).json(data);
      })
      .catch((err) => {
        // console.log(err.message);
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(400).send(err);
  }

  return res.status(400);
});

export default userController;
