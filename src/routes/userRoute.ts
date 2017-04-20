import { Router } from 'express';
import { userCtrl } from '../controller';
import { studyCtrl } from '../controller';

const userRoute: Router = Router();

userRoute.post('/user_login', userCtrl.login);
userRoute.post('/user_join', userCtrl.join);
userRoute.get('/user_test', userCtrl.test);
userRoute.get('/sess', userCtrl.sess);
userRoute.get('/user_info', userCtrl.userInfo);

userRoute.post('/study_list', studyCtrl.list);
userRoute.post('/study_new', studyCtrl.make);
userRoute.post('/study_search', studyCtrl.search);
userRoute.get('/study_admin', studyCtrl.adminList);

export { userRoute };
