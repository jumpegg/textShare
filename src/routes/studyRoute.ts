import { Router } from 'express';
import { 
		userCtrl,
		studyCtrl, 
		folderCtrl, 
		textShareCtrl, 
		scheduleCtrl,
		memberCtrl,
		placeCtrl } from '../controller';

const studyRoute: Router = Router();
studyRoute.get('/map', studyCtrl.map);

studyRoute.post('/new_schedule', scheduleCtrl.make);
studyRoute.get('/list_schedule', scheduleCtrl.list);
studyRoute.get('/one_schedule/:idx', scheduleCtrl.getSchedule);

studyRoute.get('/new_member', memberCtrl.make);
studyRoute.get('/joiner_list_member', memberCtrl.joinerList);
studyRoute.get('/hoper_list_member', memberCtrl.hoperList);

studyRoute.get('/list_place', placeCtrl.getPlaces);
studyRoute.get('/getOne_place/:idx', placeCtrl.getPlace);

export { studyRoute };
