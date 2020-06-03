import User from '../../models/user/User';

export default class UserService {
  static async userExists({ email }) {
    try {
      return await User.exists({ email });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async createVerifiedUser({ name, email, role, password }) {
    return User.create({ name, email, role, password, isVerified: true });
  }
}
