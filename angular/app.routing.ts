import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { UserpageComponent } from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent } from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

import { StudyComponent } from './component/study/study.component';
import { StudyIndex } from './component/study/index/study_index.component';
import { StudyAcc } from './component/study/account/study_acc.component';
import { StudyAdmin } from './component/study/admin/study_admin.component';
import { StudyFlow } from './component/study/flow/study_flow.component';
import { StudyFreetalk } from './component/study/freetalk/study_freetalk.component';
import { StudyNotice } from './component/study/notice/study_notice.component';
import { StudyData } from './component/study/studydata/study_studydata.component';
import { StudySchedule, StudyNewSchedule } from './component/study/schedule/study_schedule.component';

import { AuthGuard } from './service/auth-guard.service';
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
                {path: '', component: UserIndexComponent},
                {path: 'mypage', component: UserMyPageComponent},
                {path: 'textShare', component: UserTextShareComponent},
                {path: 'textBag', component: UserTextBagComponent},
                {path: 'stdJoin', component: UserSTDJoinComponent},
                {path: 'stdAdmin', component: UserSTDAdminComponent},
                {path: 'stdSearch', component: UserSTDSearchComponent}
            ]
        }]
    },
    {
        path: 'study', component: StudyComponent,
        children:[{path:'',
            children:[
                {path: '', redirectTo: 'index', pathMatch: 'full'},
                {path: 'index',component: StudyIndex},
                {path: 'account',component: StudyAcc},
                {path: 'admin',component: StudyAdmin},
                {path: 'flow',component: StudyFlow},
                {path: 'freetalk',component: StudyFreetalk},
                {path: 'notice',component: StudyNotice},
                {path: 'data',component: StudyData},
                {path: 'schedule',component: StudySchedule},
                {path: 'schedule_new',component: StudyNewSchedule},
            ]
        }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule],
    providers: [AuthGuard, UserService, UserResolve, StudyService]
})
export class AppRoutingModule {
    constructor(){

    }
}
