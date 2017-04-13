import { Router } from 'express';
import { studyCtrl } from '../controller';

const studyRoute: Router = Router();

studyRoute.post('/study_list', studyCtrl.list);
studyRoute.post('/study_new', studyCtrl.make);
studyRoute.post('/study_search', studyCtrl.search);
studyRoute.get('/study_admin', studyCtrl.adminList);

export { studyRoute };
