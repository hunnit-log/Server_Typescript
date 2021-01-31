import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    phone: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    isNotice: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);