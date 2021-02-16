
import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import SprintService from '../../services/sprint';
import { ISprintInputDTO } from '../../interfaces/ISprint';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/sprint', route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        startTime: Joi.string().required(),
        nextReviewTime: Joi.string().required(),
        day: Joi.number().required(),
        questions: Joi.array().required(),
        isNotice: Joi.bool().required(),
        goals: Joi.array().required(),
        dayOfTheWeek: Joi.string().required(),
      }),
    }),
    // middlewares.isAuth, middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Create-Sprint endpoint with body: %o', req.body );
      try {
        const sprintServiceInstance = Container.get(SprintService);
        const {success, message, data}  = await sprintServiceInstance.createSprint(req.body as ISprintInputDTO, req.currentUser);
        return res.status(200).json({ success, message, data });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    // middlewares.isAuth, middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Get-Sprint endpoint with params: %o', req.params );
      try {
        const sprintServiceInstance = Container.get(SprintService);
        const {success, message, data}  = await sprintServiceInstance.readSprint(req.params.id);
        return res.status(200).json({ success, message, data });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};