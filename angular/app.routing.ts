import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component';

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
