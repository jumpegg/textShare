import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudyGuard } from '../../guard/study-guard.service';
import { PermissionGuard } from '../../guard/permission-guard.service';

import { StudyComponent } from './study.component';
import { StudyIndex } from './index/study_index.component';
import { StudyAcc } from './account/study_acc.component';
import { StudyNewAcc } from './account/study_acc_new.component';
import { StudyAdmin } from './admin/study_admin.component';
import { StudyFlow } from './flow/study_flow.component';
import { StudyFreetalk } from './freetalk/study_freetalk.component';
import { StudyNewFreetalk } from './freetalk/study_freetalk_new.component';
import { StudyReadFreetalk } from './freetalk/study_freetalk_read.component';
import { StudyNotice } from './notice/study_notice.component';
import { StudyNewNotice } from './notice/study_notice_new.component';
import { StudyReadNotice } from './notice/study_notice_read.component';
import { StudyData } from './studydata/study_studydata.component';
import { StudyNewData } from './studydata/study_studydata_new.component';
import { StudySchedule } from './schedule/study_schedule.component';
import { StudyNewSchedule } from './schedule/study_schedule_new.component';

const studyRoutes: Routes = [
	{
		path:'', component: StudyComponent,
		canActivateChild: [StudyGuard],
		children:[
			{path: '', redirectTo: 'index', pathMatch: 'full'},
			{path: 'index',component: StudyIndex},
			{path: 'freetalk',component: StudyFreetalk},
			{path: 'freetalkNew',component: StudyNewFreetalk},
			{path: 'freetalkUpdate/:idx',component: StudyNewFreetalk},
			{path: 'freetalkRead/:idx',component: StudyReadFreetalk},
			{path: 'notice',component: StudyNotice},
			{
				path: 'noticeNew',
				canActivate: [PermissionGuard],
				component: StudyNewNotice
			},
			{
				path: 'noticeUpdate/:idx',
				canActivate: [PermissionGuard] ,
				component: StudyNewNotice
			},
			{path: 'noticeRead/:idx',component: StudyReadNotice},
			{path: 'schedule',component: StudySchedule},
			{
				path: 'scheduleNew',
				canActivate: [PermissionGuard],
				component: StudyNewSchedule
			},
			{
				path: 'scheduleUpdate/:idx',
				canActivate: [PermissionGuard],
				component: StudyNewSchedule
			},
			{path: 'account',component: StudyAcc},
			{
				path: 'accountNew',
				canActivate: [PermissionGuard],
				component: StudyNewAcc
			},
			{
				path: 'accountUpdate/:idx',
				canActivate: [PermissionGuard],
				component: StudyNewAcc
			},
			{path: 'admin',component: StudyAdmin},
			{path: 'flow',component: StudyFlow},
			{path: 'data',component: StudyData},
			{path: 'datafile/:idx',component: StudyNewData},
		]
	}
]

export const studyRouting: ModuleWithProviders = RouterModule.forChild(studyRoutes);