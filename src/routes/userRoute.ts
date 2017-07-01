import { Router } from 'express';
import { 
		userCtrl,
		studyCtrl, 
		folderCtrl, 
		textShareCtrl,
		memberCtrl,
		placeCtrl } from '../controller';

const userRoute: Router = Router();
/**
 * @api {get} /tasks List all tasks
 * @apiGroup Tasks
 * @apiSuccess {Object[]} tasks Task's list
 * @apiSuccess {Number} tasks.id Task id
 * @apiSuccess {String} tasks.title Task title
 * @apiSuccess {Boolean} tasks.done Task is done?
 * @apiSuccess {Date} tasks.updated_at Update's date
 * @apiSuccess {Date} tasks.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
userRoute.post('/user_login', userCtrl.login);
userRoute.get('/user_logout', userCtrl.logout);
userRoute.post('/user_join', userCtrl.join);
userRoute.post('/user_test', userCtrl.test);
userRoute.get('/sess', userCtrl.sess);
userRoute.get('/user_info', userCtrl.userInfo);
userRoute.get('/test', userCtrl.forTest);
userRoute.put('/put_test', userCtrl.putTest);
userRoute.delete('/delete_test', userCtrl.deleteTest);

// study admin
userRoute.post('/study_list', studyCtrl.list);
userRoute.post('/study', studyCtrl.make);
userRoute.put('/study', studyCtrl.modify);
userRoute.post('/study_search', studyCtrl.search);
userRoute.get('/study_admin', studyCtrl.adminList);
userRoute.get('/study_joinList', studyCtrl.joinList);
userRoute.get('/study_search_place/:input', studyCtrl.place_search);
userRoute.get('/study_map_test', studyCtrl.map);
userRoute.get('/study_getOne/:idx', studyCtrl.getOne);
userRoute.get('/study_enter/:idx', studyCtrl.studyEnter);
userRoute.get('/study_set', studyCtrl.studySet);
userRoute.get('/isUserStudy', studyCtrl.isUserStudy);
userRoute.get('/latest', studyCtrl.latestList);
userRoute.post('/text_search', studyCtrl.textSearch);

// folder
userRoute.post('/folder_create', folderCtrl.make);
userRoute.get('/folder_list', folderCtrl.list);
userRoute.get('/folder_treeList', folderCtrl.treeList);

// study place
userRoute.post('/place',placeCtrl.make);
userRoute.get('/place_list/:idx',placeCtrl.placeList);
userRoute.delete('/place/:idx',placeCtrl.placeRemove);

// textshare
userRoute.post('/textshare', textShareCtrl.make);
userRoute.put('/textshare', textShareCtrl.update);
userRoute.get('/ts_selectOne/:idx', textShareCtrl.getContent);

export { userRoute };
