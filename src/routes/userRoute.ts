import { Router } from 'express';
import { userCtrl } from '../controller';

const userRoute: Router = Router();

userRoute.post('/user_login', userCtrl.login);

export { userRoute };
