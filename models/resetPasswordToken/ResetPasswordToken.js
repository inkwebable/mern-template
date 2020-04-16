import mongoose from 'mongoose';

const ResetPasswordTokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const ResetPasswordToken = mongoose.model('ResetPasswordToken', ResetPasswordTokenSchema);

export default ResetPasswordToken;
