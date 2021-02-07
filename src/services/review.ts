import { Service, Inject } from 'typedi';
import dayjs from 'dayjs';
import { IReview, IReviewInputDTO }  from '../interfaces/IReview';

const SPRINT_DAY = 100;

@Service()
export default class GoalService {
  constructor(
    @Inject('logger') private logger,
  ) {
  }
  public async createReview(InputDTO: IReviewInputDTO): Promise<{ reviews : IReview[];}> {
    
    try {
      let reviews : IReview[] = [];
      const {
        startTime,
        day,
        questions,
      } = InputDTO;
      const comments = new Map<string, string>();
      let nextDate = dayjs(startTime).add(day,'day').format('YYYY-MM-DD');
      const endTime = dayjs(startTime).add(SPRINT_DAY,'day').format('YYYY-MM-DD');
      questions.map((q) => {
        comments.set(q, '');
      })
      while(nextDate <= endTime) {
        reviews.push({
          reviewTime : nextDate,
          averageAchievement : 0,
          comments : comments
        })
        nextDate = dayjs(nextDate).add(day,'day').format('YYYY-MM-DD');
      }

      return { reviews };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}