import { Router } from 'express';
import { 
		userCtrl,
		studyCtrl, 
		folderCtrl, 
		textShareCtrl, 
		scheduleCtrl,
		memberCtrl,
		accountCtrl,
		placeCtrl } from '../controller';

const studyRoute: Router = Router();
studyRoute.get('/map', studyCtrl.map);

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

studyRoute.get('/list_place', placeCtrl.getPlaces);
studyRoute.get('/getOne_place/:idx', placeCtrl.getPlace);

export { studyRoute };
