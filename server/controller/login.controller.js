import express from 'express';
import { generateToken, generateRefreshToken } from '../generateToken';

const loginController = express.Router();

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

const refreshTokens = [];

const login = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // get user details based on the login parameters

    // const result = await emailExists(email);

    // const { id, firstname} = result;

    // Filter user from the users array by username and password
    const user = users.find(u => {
      return u.username === username && u.password === password;
    });

    if (user) {
      const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;

      const token = generateToken(user.id, user.username, user.role);

      // const refreshToken = generateRefreshToken(user.id, user.username, user.role);
      // refreshTokens.push(refreshToken);

      // could return the token if desired - NOT SAFE TO STORE IN LOCAL STORAGE
      res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: false, // set to true if your using https
        httpOnly: true,
      });

      // carry out other actions after generating token like sending a response);
      res.status(200).json({message: 'success'})
    } else {
      res.send('Username or password incorrect');
    }
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

loginController.get('', (req, res) => {
  res.send('hi');
});

loginController.post('', login);

export default loginController;
