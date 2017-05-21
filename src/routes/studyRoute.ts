import { Router } from 'express';
import { 
		userCtrl,
		studyCtrl, 
		folderCtrl, 
		textShareCtrl, 
		scheduleCtrl,
		memberCtrl,
		accountCtrl,
		freetalkCtrl,
		noticeCtrl,
		commentCtrl,
		dataCtrl,
		placeCtrl } from '../controller';

const studyRoute: Router = Router();
studyRoute.get('/map', studyCtrl.map);
studyRoute.get('/getOne_study', studyCtrl.getStudyInfo);

studyRoute.post('/new_schedule', scheduleCtrl.make);
studyRoute.get('/list_schedule', scheduleCtrl.list);
studyRoute.get('/one_schedule/:idx', scheduleCtrl.getSchedule);

studyRoute.get('/new_member', memberCtrl.make);
studyRoute.get('/joiner_list_member', memberCtrl.joinerList);
studyRoute.get('/hoper_list_member', memberCtrl.hoperList);

studyRoute.post('/new_account', accountCtrl.accMake);
studyRoute.post('/new_acc_info', accountCtrl.infoMake);
studyRoute.post('/new_acc_user', accountCtrl.userMake);
studyRoute.get('/list_account', accountCtrl.accList);
studyRoute.get('/list_acc_info/:idx', accountCtrl.infoList);
studyRoute.get('/list_acc_user/:idx', accountCtrl.userList);
studyRoute.get('/list_acc_get_last', accountCtrl.accGetLastOne);
studyRoute.post('/update_account', accountCtrl.accUpdate);
studyRoute.post('/update_acc_user', accountCtrl.userUpdate);
studyRoute.get('/delete_acc_info/:idx', accountCtrl.infoDelete);

studyRoute.post('/new_notice',noticeCtrl.make);
studyRoute.get('/paging_notice/:idx',noticeCtrl.limitFTList);
studyRoute.get('/getCnt_notice', noticeCtrl.listCnt);
studyRoute.get('/getOne_notice/:idx',noticeCtrl.getOne);
studyRoute.post('/update_notice',noticeCtrl.update);
studyRoute.get('/delete_notice/:idx',noticeCtrl.delete);

studyRoute.post('/new_freetalk',freetalkCtrl.make);
studyRoute.get('/paging_freetalk/:idx',freetalkCtrl.limitFTList);
studyRoute.get('/getCnt_freetalk',freetalkCtrl.listCnt);
studyRoute.get('/getOne_freetalk/:idx',freetalkCtrl.getOne);
studyRoute.post('/update_freetalk',freetalkCtrl.update);
studyRoute.get('/delete_freetalk/:idx',freetalkCtrl.delete);

studyRoute.post('/new_comment', commentCtrl.make);
studyRoute.post('/list_comment', commentCtrl.list);
studyRoute.get('/del_comment/:idx', commentCtrl.del);

studyRoute.get('/list_place', placeCtrl.getPlaces);
studyRoute.get('/getOne_place/:idx', placeCtrl.getPlace);

studyRoute.post('/new_folder_data', dataCtrl.folderMake);
studyRoute.get('/list_folder_data', dataCtrl.folderList);

export { studyRoute };
