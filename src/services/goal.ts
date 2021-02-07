import { Service, Inject } from 'typedi';
import dayjs from 'dayjs';
import { IGoal, IGoalInputDTO }  from '../interfaces/IGoal';

const SPRINT_DAY = 100;
const NEXT_DAY = 1;

@Service()
export default class GoalService {
  constructor(
    @Inject('logger') private logger,
  ) {
  }
  public async createGoal(goalInputDTO: IGoalInputDTO): Promise<{ goal : IGoal[];}> {
    
    try {
      let goal : IGoal[] = [];
      const {
        title,
        startTime,
      } = goalInputDTO;
      const initScore = -1;
      const scoreDateMap = new Map<string, number>();
      let nextDate = dayjs(startTime).add(NEXT_DAY,'day').format('YYYY-MM-DD');
      const endTime = dayjs(startTime).add(SPRINT_DAY,'day').format('YYYY-MM-DD');
      while(nextDate <= endTime) {
        scoreDateMap.set(nextDate, initScore);
        nextDate = dayjs(nextDate).add(NEXT_DAY,'day').format('YYYY-MM-DD');
      }
      title.map((t,i) => {
        goal.push({
          title : t,
          percentage : 0,
          scores : scoreDateMap
        } as IGoal)
      })
      return { goal };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}