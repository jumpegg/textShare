import { Router } from 'express';
import { studyCtrl } from '../controller';

const studyRoute: Router = Router();
studyRoute.get('/map', studyCtrl.map);

export { studyRoute };
