import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component';

import { StudyComponent } from './component/study/study.component';
import { StudyIndex } from './component/study/index/study_index.component';
import { StudyAcc } from './component/study/account/study_acc.component';
import { StudyNewAcc } from './component/study/account/study_acc_new.component';
import { StudyAdmin } from './component/study/admin/study_admin.component';
import { StudyFlow } from './component/study/flow/study_flow.component';
import { StudyFreetalk } from './component/study/freetalk/study_freetalk.component';
import { StudyNewFreetalk } from './component/study/freetalk/study_freetalk_new.component';
import { StudyReadFreetalk } from './component/study/freetalk/study_freetalk_read.component';
import { StudyNotice } from './component/study/notice/study_notice.component';
import { StudyNewNotice } from './component/study/notice/study_notice_new.component';
import { StudyReadNotice } from './component/study/notice/study_notice_read.component';
import { StudyData } from './component/study/studydata/study_studydata.component';
import { StudyNewData } from './component/study/studydata/study_studydata_new.component';
import { StudySchedule } from './component/study/schedule/study_schedule.component';
import { StudyNewSchedule } from './component/study/schedule/study_schedule_new.component';

import { AuthGuard } from './guard/auth-guard.service';
import { StudyGuard } from './guard/study-guard.service';
import { PermissionGuard } from './guard/permission-guard.service';
import { UserService } from './service/user.service';
import { StudyService } from './service/study.service';
import { MemberService } from './service/member.service';

import { userRoutes } from './routing/userpage.routing';
import { UserResolve } from './guard/user-resolve';

const routes: Routes = [
	{path: '', redirectTo: '/index', pathMatch: 'full'},
	{path: 'index', component: IndexComponent},
	{
		path: 'userpage',
		loadChildren: './client/component/userpage/userpage.module#UserpageModule',
		canActivate: [AuthGuard],
		resolve: {userResolve: UserResolve},
	},
	{
		path: 'study',
		loadChildren: './client/component/study/study.module#StudyModule',
		canActivate: [StudyGuard],
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash:true})],
	exports: [RouterModule],
	providers: [
		AuthGuard, StudyGuard, PermissionGuard, 
		UserService, UserResolve, StudyService, MemberService
	]
})
export class AppRoutingModule {
	constructor(){

	}
}
