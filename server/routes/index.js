import express from 'express';

import { loginController, logoutController, signupController, userController, usersController } from '../controller';
import passwordController from '../controller/password.controller';
import { authenticate, authorise } from '../middleware/auth';

const apiRouter = express.Router();

apiRouter.use('/users', [authenticate], usersController);
apiRouter.use('/user', [authenticate, authorise(['admin', 'member'])], userController);
apiRouter.use('/login', loginController);
apiRouter.use('/logout', logoutController);
apiRouter.use('/signup', signupController);
apiRouter.use('/password', passwordController);

export default apiRouter;
