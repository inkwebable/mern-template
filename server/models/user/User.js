import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: username => User.doesNotExist({ username }),
        message: 'Username already used.',
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

UserSchema.pre('updateOne', async function() {
  if (this._update.$set.password) {
    this._update.$set.password = hashSync(this._update.$set.password, 10);
  }
});

UserSchema.pre('findOneAndUpdate', async function() {
  // The document that `findOneAndUpdate()` will modify
  if (this._update.role) {
    this._update.role = 'member';
  }
});

UserSchema.statics.doesNotExist = async function(field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.statics.findByCredentials = async ({ username, password }) => {
  // Search for a user by username and password.
  const user = await User.findOne({ username });
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
