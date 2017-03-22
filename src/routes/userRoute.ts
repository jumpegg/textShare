import { Router } from 'express';
import { userCtrl } from '../controller';

const userRoute: Router = Router();

userRoute.post('/user_login', userCtrl.login);
userRoute.post('/user_join', userCtrl.join);
userRoute.get('/user_test', userCtrl.test);

export { userRoute };
