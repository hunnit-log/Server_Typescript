export interface IReview {
  reviewTime: string;
  averageAchievement: number;
  comments: Map<string, string>;
}

export interface IReviewInputDTO {
  startTime: string;
  day: number;
  questions: string[];
}
