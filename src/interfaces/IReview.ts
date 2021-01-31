import { IComment } from "./IComment";

export interface IReview {
  reviewTime: string;
  averageAchievement: number;
  comments: IComment[];
}

export interface IReviewInputDTO {
  question: string;
  answer: string;
  comments: IComment[];
}
