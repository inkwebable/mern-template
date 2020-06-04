import crypto from 'crypto';

import UserService from '../user/user.service';
import Mailer from '../email/Mailer';
import VerificationToken from '../../models/verificationToken/VerificationToken';
import confirmEmail from '../email/templates/confirm';

export default class SignUpService {
  static async registerUser(userData) {
    let user;

    if (process.env.EMAIL_REGISTRATION === 'true') {
      user = await UserService.createNonVerifiedUser(userData);
      console.log('user', user);
      const mailer = new Mailer({});
      const verificationToken = new VerificationToken({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      await mailer.send(user.email, confirmEmail(user.name, verificationToken.token));
      await verificationToken.save();
      await UserService.saveUser(user);
    } else {
      user = await UserService.createVerifiedUser(userData);
    }

    return user;
  }
}
