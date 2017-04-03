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

import { AuthGuard } from './service/auth-guard.service';
import { UserService } from './service/user.service';

import { userRoutes } from './routing/userpage.routing';

const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {
        path: 'userpage',
        component: UserpageComponent,
        canActivate: [AuthGuard],
        children:[{
            path: '',
            // canActivateChild: [AuthGuard],
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule],
    providers: [AuthGuard,UserService]
})
export class AppRoutingModule {
    constructor(){

    }
}
