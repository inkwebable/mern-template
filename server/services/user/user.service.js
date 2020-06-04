import User from '../../models/user/User';

export default class UserService {
  static async userExists(email) {
    return User.exists({ email });
  }

  static async createVerifiedUser({ name, email, role, password }) {
    return User.create({ name, email, role, password, isVerified: true });
  }

  static async createNonVerifiedUser({ name, email, role, password }) {
    return new User({ name, email, role, password });
  }

  static async saveUser(user) {
    await user.save();

    return user;
  }
}
