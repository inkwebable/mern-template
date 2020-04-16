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
  // console.log('updateOne');
  // console.log('updateOn query criteria', this.getQuery());
  // console.log(this._update, this._update.$set.password);
  // console.log(this._conditions);
  if (this._update.$set.password) {
    console.log('updateOne password modified');
    this._update.$set.password = hashSync(this._update.$set.password, 10);
  }
});

UserSchema.pre('findOneAndUpdate', async function() {
  console.log('findOneAndUpdate', this._update.name);
  // The document that `findOneAndUpdate()` will modify
  // const docToUpdate = await this.model.findOne(this.getQuery());
  // @TODO remove code once authorization is fleshed out
  if (this._update.role) {
    this._update.role = 'member';
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
