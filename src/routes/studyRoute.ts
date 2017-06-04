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

// schedule
studyRoute.post('/new_schedule', scheduleCtrl.make);
studyRoute.post('/update_schedule', scheduleCtrl.update);
studyRoute.get('/list_schedule', scheduleCtrl.list);
studyRoute.get('/one_schedule/:idx', scheduleCtrl.getSchedule);
studyRoute.get('/getIndex_schedule', scheduleCtrl.index);

// account
studyRoute.post('/new_account', accountCtrl.accMake);
studyRoute.post('/new_acc_info', accountCtrl.infoMake);
studyRoute.post('/new_acc_user', accountCtrl.userMake);
studyRoute.get('/getOne_account/:idx', accountCtrl.accGetOne);
studyRoute.get('/list_account', accountCtrl.accList);
studyRoute.get('/list_acc_info/:idx', accountCtrl.infoList);
studyRoute.get('/list_acc_user/:idx', accountCtrl.userList);
studyRoute.get('/list_acc_get_last', accountCtrl.accGetLastOne);
studyRoute.post('/update_account', accountCtrl.accUpdate);
studyRoute.post('/update_acc_user', accountCtrl.userUpdate);
studyRoute.get('/delete_acc_info/:idx', accountCtrl.infoDelete);
studyRoute.get('/delete_acc_user/:idx', accountCtrl.userDelete);

// notice
studyRoute.post('/new_notice',noticeCtrl.make);
studyRoute.get('/paging_notice/:idx',noticeCtrl.limitFTList);
studyRoute.get('/getCnt_notice', noticeCtrl.listCnt);
studyRoute.get('/getOne_notice/:idx',noticeCtrl.getOne);
studyRoute.post('/update_notice',noticeCtrl.update);
studyRoute.get('/delete_notice/:idx',noticeCtrl.delete);
studyRoute.get('/getIndex_notice', noticeCtrl.index);

// freetalk
studyRoute.post('/new_freetalk',freetalkCtrl.make);
studyRoute.get('/paging_freetalk/:idx',freetalkCtrl.limitFTList);
studyRoute.get('/getCnt_freetalk',freetalkCtrl.listCnt);
studyRoute.get('/getOne_freetalk/:idx',freetalkCtrl.getOne);
studyRoute.post('/update_freetalk',freetalkCtrl.update);
studyRoute.get('/delete_freetalk/:idx',freetalkCtrl.delete);
studyRoute.get('/getIndex_freetalk',freetalkCtrl.index);

// comment
studyRoute.post('/new_comment', commentCtrl.make);
studyRoute.post('/list_comment', commentCtrl.list);
studyRoute.get('/del_comment/:idx', commentCtrl.del);

// place
studyRoute.get('/list_place', placeCtrl.getPlaces);
studyRoute.get('/getOne_place/:idx', placeCtrl.getPlace);

// folder
studyRoute.post('/new_folder_data', dataCtrl.folderMake);
studyRoute.get('/list_folder_data', dataCtrl.folderList);
studyRoute.post('/new_file_data/:idx', dataCtrl.fileMake);
studyRoute.post('/new_flow_file_data/:folder_idx/:flow_idx', dataCtrl.flowFileMake);
studyRoute.get('/list_file_data/:idx', dataCtrl.fileList);
studyRoute.get('/list_flow_file_data/:idx', dataCtrl.flowFileList);
studyRoute.post('/is_file_data',dataCtrl.isFile);
studyRoute.post('/del_file_data', dataCtrl.delFile);

// flow
studyRoute.post('/new_flow', flowCtrl.make);
studyRoute.get('/list_flow', flowCtrl.list);
studyRoute.get('/getOne_flow/:idx', flowCtrl.getOne);
studyRoute.post('/update_flow', flowCtrl.update);
studyRoute.get('/delete_flow/:idx', flowCtrl.delete);

export { studyRoute };
