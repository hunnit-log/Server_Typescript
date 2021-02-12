import { Service, Inject } from 'typedi';
import { ISprint, ISprintInputDTO } from '../interfaces/ISprint';
import { IUser } from '../interfaces/IUser';
import { IGoalInputDTO } from '../interfaces/IGoal';
import { IReviewInputDTO } from '../interfaces/IReview';
import SprintModel from '../models/sprint';
import GoalService from './goal';
import ReviewService from './review';
import dayjs from 'dayjs';

@Service()
export default class SprintService {
  constructor(
    @Inject('sprintModel') private sprintModel: typeof SprintModel,
    @Inject('logger') private logger,
    private goalService: GoalService,
    private reviewService: ReviewService,
  ) {
  }

  public async createSprint(sprintInputDTO: ISprintInputDTO, user : IUser): Promise<{ success: boolean; message: string; data: object;}> {
    try {
      const {
        startTime,
        questions,
        nextReviewTime,
        dayOfTheWeek,      
        day,
        goals,
        isNotice,
      } = sprintInputDTO;
      // [1]. Goal 생성
      const goalInputDTO : IGoalInputDTO = {
        startTime,
        title : goals
      };
      const {goal} = await this.goalService.createGoal(goalInputDTO);
      if (!goal) {
        throw new Error('Goal cannot be created');
      }

      // [2]. Reviews 생성
      const reviewInputDTO : IReviewInputDTO = {
        startTime,
        day,
        questions
      };
      const review_result = await this.reviewService.createReview(reviewInputDTO);
      if (!review_result) {
        throw new Error('Review cannot be created');
      }

      // 리펙토링 가능하지 않을까
      const sprintDTO : ISprint = {
        startTime : startTime,
        endTime : startTime,
        question : questions,
        nextReviewTime : nextReviewTime,
        totalPercentage : 0,
        isProgress : true,
        goal : goal,
        reviews : review_result.reviews,
        dayOfTheWeek : dayOfTheWeek,
        isNotice : isNotice,
        user : '11',
      };
      const sprintRecord = await this.sprintModel.create({
        ...sprintDTO,
      });
      if (!sprintRecord) {
        throw new Error('Sprint cannot be created');
      }
      console.log(sprintRecord);
      const sprint = sprintRecord.toObject();
      return { success:true, message:'성공', data:sprint };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async readSprint(id : string): Promise<{ success: boolean; message: string; data: object;}> {
    try {
      const sprintRecord = await this.sprintModel.findOne({
        _id: id,
        isProgress: true
      }).select('-reviews -question -createdAt -updatedAt -isNotice -isProgress');
      if (!sprintRecord) {
        throw new Error('Sprint cannot be read');
      }
      const sprint = sprintRecord.toObject();
      sprint.goal.sort((a, b) => a.percentage < b.percentage ? -1 : a.percentage > b.percentage ? 1 : 0)
      const dDay = this.getdDay(sprint.endTime);
      sprint.dDay = dDay.dDay;
      return { success:true, message:'성공', data:sprint };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private getdDay(endTime : string): { dDay: number} {
    try {
      const endDate = dayjs(endTime);
      const today = dayjs();
      const dDay = endDate.diff(today,'days');
      return { dDay };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}