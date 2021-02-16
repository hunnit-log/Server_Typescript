import { IGoal } from "./IGoal";
import { IReview } from "./IReview";

export interface ISprint {
  _id: string;
  startTime: string;
  endTime: string;
  question: string[];
  nextReviewTime: string;
  totalPercentage: number;
  isProgress: boolean;
  isNotice: boolean;
  goal : IGoal[];
  dayOfTheWeek : string;
  reviews : IReview[];
  user: string;
}

export interface ISprintInputDTO {
  startTime: string;
  day: number;
  nextReviewTime: string;
  dayOfTheWeek : string;
  goals: string[];
  questions: string[];
  isNotice: boolean;
}
