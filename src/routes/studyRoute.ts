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
		flowCtrl,
		placeCtrl } from '../controller';

const studyRoute: Router = Router();
// study
studyRoute.get('/map', studyCtrl.map);
studyRoute.get('/getOne_study', studyCtrl.getStudyInfo);
studyRoute.get('/get_auth', studyCtrl.getPermission);

// member
studyRoute.get('/get_permission', memberCtrl.getPermission);
studyRoute.post('/set_permission', memberCtrl.setPermission);
studyRoute.get('/new_member', memberCtrl.make);
studyRoute.get('/joiner_list_member', memberCtrl.joinerList);
studyRoute.get('/hoper_list_member', memberCtrl.hoperList);
studyRoute.get('/is_member', memberCtrl.isMember);
studyRoute.post('/allow_member', memberCtrl.allow);
studyRoute.post('/reject_member', memberCtrl.reject);
studyRoute.get('/getUserInfo_member', memberCtrl.getUserInfo);

// schedule
studyRoute.post('/schedule', scheduleCtrl.make);
studyRoute.put('/schedule', scheduleCtrl.update);
studyRoute.get('/list_schedule', scheduleCtrl.list);
studyRoute.get('/one_schedule/:idx', scheduleCtrl.getSchedule);
studyRoute.get('/getIndex_schedule', scheduleCtrl.index);
studyRoute.post('/recentByStudy_schedule', scheduleCtrl.recentByStudy);

// account
studyRoute.post('/account', accountCtrl.accMake);
studyRoute.post('/acc_info', accountCtrl.infoMake);
studyRoute.post('/acc_user', accountCtrl.userMake);
studyRoute.get('/getOne_account/:idx', accountCtrl.accGetOne);
studyRoute.get('/list_account', accountCtrl.accList);
studyRoute.get('/list_acc_info/:idx', accountCtrl.infoList);
studyRoute.get('/list_acc_user/:idx', accountCtrl.userList);
studyRoute.get('/list_acc_get_last', accountCtrl.accGetLastOne);
studyRoute.put('/account', accountCtrl.accUpdate);
studyRoute.put('/acc_user', accountCtrl.userUpdate);
studyRoute.delete('/acc_info/:idx', accountCtrl.infoDelete);
studyRoute.delete('/acc_user/:idx', accountCtrl.userDelete);

// notice
studyRoute.post('/notice',noticeCtrl.make);
studyRoute.get('/paging_notice/:idx',noticeCtrl.limitFTList);
studyRoute.get('/getCnt_notice', noticeCtrl.listCnt);
studyRoute.get('/getOne_notice/:idx',noticeCtrl.getOne);
studyRoute.put('/notice',noticeCtrl.update);
studyRoute.delete('/notice/:idx',noticeCtrl.delete);
studyRoute.get('/getIndex_notice', noticeCtrl.index);

// freetalk
studyRoute.post('/freetalk',freetalkCtrl.make);
studyRoute.get('/paging_freetalk/:idx',freetalkCtrl.limitFTList);
studyRoute.get('/getCnt_freetalk',freetalkCtrl.listCnt);
studyRoute.get('/getOne_freetalk/:idx',freetalkCtrl.getOne);
studyRoute.put('/freetalk',freetalkCtrl.update);
studyRoute.delete('/freetalk/:idx',freetalkCtrl.delete);
studyRoute.get('/getIndex_freetalk',freetalkCtrl.index);

// comment
studyRoute.post('/comment', commentCtrl.make);
studyRoute.post('/list_comment', commentCtrl.list);
studyRoute.delete('/del_comment/:idx', commentCtrl.del);

// place
studyRoute.get('/list_place', placeCtrl.getPlaces);
studyRoute.get('/getOne_place/:idx', placeCtrl.getPlace);

// folder
studyRoute.post('/folder_data', dataCtrl.folderMake);
studyRoute.get('/list_folder_data', dataCtrl.folderList);
studyRoute.post('/new_file_data/:idx', dataCtrl.fileMake);
studyRoute.post('/new_flow_file_data/:folder_idx/:flow_idx', dataCtrl.flowFileMake);
studyRoute.get('/list_file_data/:idx', dataCtrl.fileList);
studyRoute.get('/list_flow_file_data/:idx', dataCtrl.flowFileList);
studyRoute.post('/is_file_data',dataCtrl.isFile);
studyRoute.post('/del_file_data', dataCtrl.delFile);

// flow
studyRoute.post('/flow', flowCtrl.make);
studyRoute.get('/list_flow', flowCtrl.list);
studyRoute.get('/getOne_flow/:idx', flowCtrl.getOne);
studyRoute.put('/flow', flowCtrl.update);
studyRoute.delete('/flow/:idx', flowCtrl.delete);

export { studyRoute };
