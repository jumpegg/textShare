import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { UserpageComponent } from './component/userpage/userpage.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent, UserTextShareNewComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent } from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

import { StudyComponent } from './component/study/study.component';
import { StudyIndex } from './component/study/index/study_index.component';
import { StudyAcc } from './component/study/account/study_acc.component';
import { StudyNewAcc } from './component/study/account/study_acc_new.component';
import { StudyAdmin } from './component/study/admin/study_admin.component';
import { StudyFlow } from './component/study/flow/study_flow.component';
import { StudyFreetalk } from './component/study/freetalk/study_freetalk.component';
import { StudyNewFreetalk } from './component/study/freetalk/study_freetalk_new.component';
import { StudyNotice } from './component/study/notice/study_notice.component';
import { StudyNewNotice } from './component/study/notice/study_notice_new.component';
import { StudyData } from './component/study/studydata/study_studydata.component';
import { StudyNewData } from './component/study/studydata/study_studydata_new.component';
import { StudySchedule } from './component/study/schedule/study_schedule.component';
import { StudyNewSchedule } from './component/study/schedule/study_schedule_new.component';

import { AuthGuard } from './service/auth-guard.service';
import { StudyGuard } from './service/study-guard.service';
import { UserService } from './service/user.service';
import { StudyService } from './service/study.service';
// import { UserInfo } from './service/userinfo.service';

import { userRoutes } from './routing/userpage.routing';
import { UserResolve } from './service/user-resolve';

const routes: Routes = [
	{path: '', redirectTo: '/index', pathMatch: 'full'},
	{path: 'index', component: IndexComponent},
	{
		path: 'userpage', component: UserpageComponent,
		canActivate: [AuthGuard],
		resolve: {
			userResolve: UserResolve
		},
		children:[{
			path: '',
			canActivateChild: [AuthGuard],
			children: [
				{path: '', component: UserSTDAdminComponent},
				{path: 'mypage', component: UserMyPageComponent},
				{path: 'textShare', component: UserTextShareComponent},
				{path: 'textShareNew', component: UserTextShareNewComponent},
				{path: 'textBag', component: UserTextBagComponent},
				{path: 'stdJoin', component: UserSTDJoinComponent},
				{path: 'stdAdmin', component: UserSTDAdminComponent},
				{path: 'stdSearch', component: UserSTDSearchComponent}
			]
		}]
	},
	{
		path: 'study', component: StudyComponent,
		canActivate: [StudyGuard],
		children:[{
			path:'',
			canActivateChild:[StudyGuard],
			children:[
				{path: '', redirectTo: 'index', pathMatch: 'full'},
				{path: 'index',component: StudyIndex},
				{path: 'freetalk',component: StudyFreetalk},
				{path: 'freetalkNew',component: StudyNewFreetalk},
				{path: 'notice',component: StudyNotice},
				{path: 'noticeNew',component: StudyNewNotice},
				{path: 'schedule',component: StudySchedule},
				{path: 'scheduleNew',component: StudyNewSchedule},
				{path: 'account',component: StudyAcc},
				{path: 'accountNew',component: StudyNewAcc},
				{path: 'admin',component: StudyAdmin},
				{path: 'flow',component: StudyFlow},
				{path: 'data',component: StudyData},
				{path: 'dataNew',component: StudyNewData},
			]
		}]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash:true})],
	// imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard, StudyGuard, UserService, UserResolve, StudyService]
})
export class AppRoutingModule {
	constructor(){

	}
}
