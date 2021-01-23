import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
// 이벤트가 트리거 될 수 있도록 최소한 모든 이벤트를 한 번 가져와야합니다.
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * 몽구스 모델을 DI 컨테이너에 주입합니다.
   * 이것이 논란의 여지가 있을 수 있습니다. 
   * 단, 단위 테스트를 작성할 때 많은 유연성을 제공 할 것입니다.
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };

  // 후속 loaders에서 필요하기 때문에 agenda 인스턴스를 반환합니다.
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      // sprintModel,
      // whateverModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
