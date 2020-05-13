import mongoose from 'mongoose';

const VerificationTokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);

export default VerificationToken;
