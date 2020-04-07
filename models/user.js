import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: email => User.doesNotExist({ email }),
        message: 'Email already used.',
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'member'],
    },
  },
  { timestamps: true },
);

// middleware
UserSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function(field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.statics.findByCredentials = async ({ email, password }) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordMatch = await compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

UserSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
