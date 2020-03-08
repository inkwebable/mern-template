import express from 'express';
import { User } from '../models';
import { authorise } from '../middleware/authorize';

const userController = express.Router();

// get user resource
userController.get('/', (req, res) => {
  // user should be authed and available on the request
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

userController.patch('/update/:id', (req, res) => {
  // @TODO validate params
  if (!req.body.name) {
    return res.status(422).send({ error: 'missing parameter(s)' });
  }

  try {
    User.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true, runValidators: true })
      .then(data => {
        return res.status(202).json(data);
      })
      .catch(err => {
        // console.log(err.message);
        return res.status(400).send(err);
        // next()
      });
  } catch (err) {
    return res.status(400).send(err);
  }

  return res.status(400);
});

userController.delete('/delete/:id', [authorise(['admin'])], (req, res) => {
  if (req.user.id === req.params.id) {
    return res.json({ message: 'Cannot delete self' });
  }

  try {
    User.findOneAndDelete({ _id: req.params.id })
      .then(data => {
        return res.json(data);
      })
      .catch(err => {
        return res.status(400).send(err);
      });
  } catch (err) {
    res.status(401).send(err);
  }

  return res.status(400);
});

export default userController;
