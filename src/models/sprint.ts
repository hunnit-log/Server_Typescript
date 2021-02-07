import { ISprint } from '../interfaces/ISprint';

import mongoose from 'mongoose';

const Sprint = new mongoose.Schema(
  {
    startTime: {
      type: String,
      index: true,
    },
    endTime: {
      type: String,
    },
    question: {
      type: [String],
    },
    nextReviewTime: {
      type: String,
    },
    totalPercentage: {
      type: Number,
    },
    isProgress: {
      type: Boolean,
      default: true,
    },
    isNotice : {
      type: Boolean,
      default: true,
    },
    goal: {
      type: [Object],
    },
    dayOfTheWeek: {
      type: String,
    },
    reviews: {
      type: [Object],
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISprint & mongoose.Document>('Sprint', Sprint);