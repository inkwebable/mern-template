import express from 'express';
import User from '../models/user';
import { authorise } from '../middleware/authorize';

const usersController = express.Router();

usersController.get('/', [authorise(['admin'])], async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

usersController.patch('/update/:id', [authorise(['admin'])], (req, res) => {
  // @TODO validate params or let the model handle it
  if (!req.body.name) {
    return res.status(422).send({ error: 'missing parameter(s)' });
  }

  try {
    User.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true, runValidators: true, fields: { password: 0 } })
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

usersController.delete('/delete/:id', [authorise(['admin'])], (req, res) => {
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

export default usersController;
