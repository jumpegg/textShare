import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { TreeModule } from 'tree-component';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';

import { UserpageComponent } from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent} from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

// import { UserModule } from './user.module';

import { StudyComponent } from './component/study/study.component';
import { StudyIndex } from './component/study/index/study_index.component';
import { StudyAcc } from './component/study/account/study_acc.component';
import { StudyAdmin } from './component/study/admin/study_admin.component';
import { StudyFlow } from './component/study/flow/study_flow.component';
import { StudyFreetalk } from './component/study/freetalk/study_freetalk.component';
import { StudyNotice } from './component/study/notice/study_notice.component';
import { StudyData } from './component/study/studydata/study_studydata.component';
import { StudySchedule, StudyNewSchedule } from './component/study/schedule/study_schedule.component';

import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule, ReactiveFormsModule,
      HttpModule,
      AppRoutingModule,
      MyDatePickerModule,
      TreeModule
    //   UserModule,
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    UserpageComponent,
    UserIndexComponent,
    UserMyPageComponent,
    UserTextShareComponent,
    UserTextBagComponent,
    UserSTDJoinComponent,
    UserSTDAdminComponent,
    UserSTDSearchComponent,   

    StudyComponent,
    StudyIndex,
    StudyAcc,
    StudyAdmin,
    StudyFlow,
    StudyFreetalk,
    StudyNotice,
    StudyData,
    StudySchedule, StudyNewSchedule
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule{
    constructor(router: Router){

    }
}
