import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { studyRouting } from './study.routing';

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

@NgModule({
	imports : [
		studyRouting,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations : [
		StudyComponent,
		StudyIndex,
		StudyAcc,
		StudyNewAcc,
		StudyAdmin,
		StudyFlow,
		StudyFreetalk,
		StudyNewFreetalk,
		StudyReadFreetalk,
		StudyNotice,
		StudyNewNotice,
		StudyReadNotice,
		StudyData,
		StudyNewData,
		StudySchedule,
		StudyNewSchedule
	]
})
export class StudyModule {}