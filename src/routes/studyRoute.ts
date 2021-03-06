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
/**
 * @api {get} /study/getOne_study Get study info
 * @apiGroup Study
 * @apiDescription 스터디의 간략 정보 조회
 * @apiName Get study info
 *
 */
studyRoute.get('/getOne_study', studyCtrl.getStudyInfo);
/**
 * @api {get} /study/get_auth Get permission
 * @apiGroup Study
 * @apiDescription 현재 접속자의 스터디 권한 조회
 * @apiName get_auth
 *
 */
studyRoute.get('/get_auth', studyCtrl.getPermission);

// member
/**
 * @api {get} /study/get_permission Get permission
 * @apiGroup Member
 * @apiDescription 현재 접속자의 스터디 권한 조회
 * @apiName Get permission
 *
 */
studyRoute.get('/get_permission', memberCtrl.getPermission);
/**
 * @api {post} /study/set_permission Set permission
 * @apiGroup Member
 * @apiDescription 회원정보 수정
 * @apiName Permission modify
 *
 * @apiParam {Number} idx member Table 의 PK
 * @apiParam {Number} permission 권한 레벨
 *
 */
studyRoute.post('/set_permission', memberCtrl.setPermission);
/**
 * @api {get} /study/new_permission Create member
 * @apiGroup Member
 * @apiDescription 스터디 회원가입시 회원 생성
 * @apiName Member create
 *
 */
studyRoute.get('/new_member', memberCtrl.make);
/**
 * @api {get} /study/joiner_list_member Get joiner list
 * @apiGroup Member
 * @apiDescription 가입된 스터디 멤버 조회
 * @apiName Get joiner list
 *
 */
studyRoute.get('/joiner_list_member', memberCtrl.joinerList);
/**
 * @api {get} /study/hoper_list_member Get hoper list
 * @apiGroup Member
 * @apiDescription 가입신청한 멤버 조회
 * @apiName Get hoper list
 *
 */
studyRoute.get('/hoper_list_member', memberCtrl.hoperList);
/**
 * @api {get} /study/is_member Create account
 * @apiGroup Member
 * @apiDescription 스터디 회원인지 조회
 * @apiName Create account
 *
 */
studyRoute.get('/is_member', memberCtrl.isMember);
/**
 * @api {post} /study/allow_member Allow member
 * @apiGroup Member
 * @apiDescription 가입 허가
 * @apiName Allow member
 *
 * @apiParam {Number} idx member 테이블 idx
 *
 */
studyRoute.post('/allow_member', memberCtrl.allow);
/**
 * @api {post} /study/reject_member Reject member
 * @apiGroup Member
 * @apiDescription 가입 거절
 * @apiName Reject member
 *
 * @apiParam {Number} idx member 테이블 idx
 *
 */
studyRoute.post('/reject_member', memberCtrl.reject);
/**
 * @api {get} /study/getUserInfo_member Reject member
 * @apiGroup Member
 * @apiDescription 가입 거절
 * @apiName Reject member
 *
 * @apiParam {Number} idx member 테이블 idx
 *
 */
studyRoute.get('/getUserInfo_member', memberCtrl.getUserInfo);

// schedule
/**
 * @api {post} /study/schedule Create Schedule 
 * @apiGroup Schedule
 * @apiDescription 스케쥴 생성
 * @apiName Create schedule
 *
 * @apiParam {Date} gathering 모임날짜
 * @apiParam {String} start 스터디 시작
 * @apiParam {String} end 스터디 종료
 * @apiParam {Number} cost 모임비용
 * @apiParam {Number} place_idx 장소 PK
 *
 */
studyRoute.post('/schedule', scheduleCtrl.make);
/**
 * @api {put} /study/schedule Update schedule 
 * @apiGroup Schedule
 * @apiDescription 스케쥴 생성
 * @apiName Schedule update
 * 
 * @apiParam {Number} idx 스케쥴 PK
 * @apiParam {Date} gathering 모임날짜
 * @apiParam {String} start 스터디 시작
 * @apiParam {String} end 스터디 종료
 * @apiParam {Number} cost 모임비용
 * @apiParam {Number} place_idx 장소 PK
 *
 */
studyRoute.put('/schedule', scheduleCtrl.update);
/**
 * @api {get} /study/list_schedule Get schedule list 
 * @apiGroup Schedule
 * @apiDescription 모든 스케쥴 리스트 받기
 * @apiName Get schedule list
 *
 */
studyRoute.get('/list_schedule', scheduleCtrl.list);
/**
 * @api {get} /study/one_schedule Get schedule one
 * @apiGroup Schedule
 * @apiDescription 특정 스케쥴 조회
 * @apiName Get one schedule
 * 
 * @apiParam {Number} idx 스케쥴 PK
 */
studyRoute.get('/one_schedule/:idx', scheduleCtrl.getSchedule);
/**
 * @api {get} /study/getIndex_schedule Get schedule one for index page
 * @apiGroup Schedule
 * @apiDescription schedule 첫 페이지에 보여줄 자료 조회
 * @apiName Get index schedule
 * 
 * @apiParam {Number} idx 스케쥴 PK
 */
studyRoute.get('/getIndex_schedule', scheduleCtrl.index);
/**
 * @api {post} /study/recentByStudy_schedule Get place name 
 * @apiGroup Schedule
 * @apiDescription schedule 다음 장소이름 조회
 * @apiName Get place name
 * 
 * @apiParam {Number} idx 스케쥴 PK
 */
studyRoute.post('/recentByStudy_schedule', scheduleCtrl.recentByStudy);

// account

/**
 * @api {post} /study/account Create Account
 * @apiGroup Account
 * @apiDescription 회계 생성
 * @apiName Create Account
 *
 * @apiParam {String} title 회계이름
 * @apiParam {Date} gathering 수금날짜
 *
 */
studyRoute.post('/account', accountCtrl.accMake);
/**
 * @api {post} /study/acc_info Create Account Info
 * @apiGroup Account
 * @apiDescription 사용된 금액 정보 생성
 * @apiName Create Account Info
 *
 * @apiParam {String} detali 사용내역
 * @apiParam {String} cost 사용비용
 *
 */
studyRoute.post('/acc_info', accountCtrl.infoMake);
/**
 * @api {post} /study/acc_user Create Account User
 * @apiGroup Account
 * @apiDescription 입금자 리스트 생성
 * @apiName Create Account User
 *
 * @apiParam {Number} cost 회비내역
 *
 */
studyRoute.post('/acc_user', accountCtrl.userMake);
/**
 * @api {get} /study/getOne_account/{idx} Get one account
 * @apiGroup Account
 * @apiDescription 특정 회계정보 조회
 * @apiName Get one account
 *
 * @apiParam {Number} idx 회계 PK
 *
 */
studyRoute.get('/getOne_account/:idx', accountCtrl.accGetOne);
/**
 * @api {get} /study/list_account/ Get account list
 * @apiGroup Account
 * @apiDescription 스터디 회계 조회
 * @apiName Get account list
 *
 */
studyRoute.get('/list_account', accountCtrl.accList);
/**
 * @api {get} /study/list_acc_info/{idx} Get account info list
 * @apiGroup Account
 * @apiDescription 회계 관련 사용내역 조회
 * @apiName Get account info list
 *
 * @apiParam {Number} idx 회계 info PK
 *
 */
studyRoute.get('/list_acc_info/:idx', accountCtrl.infoList);
/**
 * @api {get} /study/list_acc_user/{idx} Get account user list
 * @apiGroup Account
 * @apiDescription 회계 관련 사용자 조회
 * @apiName Get account user list
 *
 * @apiParam {Number} idx 회계 user PK
 *
 */
studyRoute.get('/list_acc_user/:idx', accountCtrl.userList);
/**
 * @api {get} /study/list_acc_get_last Get lastest account
 * @apiGroup Account
 * @apiDescription 최근 회계 조회
 * @apiName Get lastest account
 *
 */
studyRoute.get('/list_acc_get_last', accountCtrl.accGetLastOne);
/**
 * @api {put} /study/account Create Account
 * @apiGroup Account
 * @apiDescription 회계 생성
 * @apiName Create Account
 *
 * @apiParam {Number} idx 회계 PK
 * @apiParam {String} title 회계이름
 * @apiParam {Date} gathering 수금날짜
 *
 */
studyRoute.put('/account', accountCtrl.accUpdate);
/**
 * @api {put} /study/acc_user Update Account user
 * @apiGroup Account
 * @apiDescription 회계 관련 사용자 수정
 * @apiName Update Account user
 *
 * @apiParam {Number} idx 회계 사용자 PK
 * @apiParam {Number} cost 회비내역
 *
 */
studyRoute.put('/acc_user', accountCtrl.userUpdate);
/**
 * @api {delete} /study/acc_info/{idx} Delete account info
 * @apiGroup Account
 * @apiDescription 회계 관련 정보 삭제
 * @apiName Delete account info
 *
 * @apiParam {Number} idx 회계 user PK
 *
 */
studyRoute.delete('/acc_info/:idx', accountCtrl.infoDelete);
/**
 * @api {delete} /study/acc_user/{idx} Delete account user
 * @apiGroup Account
 * @apiDescription 회계 관련 사용자 삭제
 * @apiName Delete account user
 *
 * @apiParam {Number} idx 회계 user PK
 *
 */
studyRoute.delete('/acc_user/:idx', accountCtrl.userDelete);

// notice
/**
 * @api {post} /notice Create notice
 * @apiGroup Notice
 * @apiDescription 공지사항 생성
 * @apiName Create notice
 *
 * @apiParam {String} title 공지사항 제목
 * @apiParam {String} content 공지사항 내용
 * 
 */
studyRoute.post('/notice',noticeCtrl.make);
/**
 * @api {get} /paging_notice/{idx} Create notice
 * @apiGroup Notice
 * @apiDescription 공지사항 생성
 * @apiName Create notice
 *
 * @apiParam {String} title 공지사항 제목
 * @apiParam {String} content 공지사항 내용
 * 
 */
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
