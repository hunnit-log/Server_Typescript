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
  goal : IGoal[];
  dayOfTheWeek : string;
  reviews : IReview[];
}

export interface ISprintInputDTO {
  startTime: string;
  question: string[];
  nextReviewTime: string;
  goal : IGoal[];
  dayOfTheWeek : string;
  reviews : IReview[];
}
