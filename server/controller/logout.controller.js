import express from 'express';

const logoutController = express.Router();

const logout = async (req, res) => {
  try {
    res.cookie(
      '_p',
      {},
      {
        maxAge: 0,
        httpOnly: false,
      },
    );

    res.cookie(
      '_s',
      {},
      {
        maxAge: 0,
        httpOnly: true,
      },
    );

    return res.status(200).json({ message: 'User logged out' });
  } catch (err) {
    console.log('logout err caught - see in console', err);
    return res.status(400).json(err.toString());
  }
};

logoutController.get('', logout);

logoutController.post('', logout);

export default logoutController;
