export interface IGoal {
  title: string;
  percentage: number;
  scores: Map<string, number>;
}

export interface IGoalInputDTO {
  title: string[];
  startTime: string;
}
