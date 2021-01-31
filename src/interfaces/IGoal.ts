import { IScore } from '../interfaces/IScore';

export interface IGoal {
  title: string;
  percentage: string;
  scores: IScore[];
}

export interface IGoalInputDTO {
  title: string;
  percentage: string;
  scores: IScore[];
}
