import { Router } from 'express';
import { userCtrl,
		studyCtrl, 
		folderCtrl, 
		textShareCtrl, 
		placeCtrl } from '../controller';

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
userRoute.get('/study_search_place/:input', studyCtrl.place_search);
userRoute.get('/study_map_test', studyCtrl.map);

userRoute.post('/folder_create', folderCtrl.make);
userRoute.get('/folder_list', folderCtrl.list);
userRoute.get('/folder_treeList', folderCtrl.treeList);
// userRoute.get('/folder_remove', );

userRoute.post('/place_new',placeCtrl.make);
userRoute.get('/place_list/:idx',placeCtrl.placeList);

userRoute.post('/ts_create', textShareCtrl.make);
userRoute.get('/ts_selectOne/:idx', textShareCtrl.getContent);

export { userRoute };
