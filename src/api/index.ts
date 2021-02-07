import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import sprint from './routes/sprint';

// 종속성 확보 보장
export default () => {
	const app = Router();
	auth(app);
	user(app);
	agendash(app);
	sprint(app);
	return app
}