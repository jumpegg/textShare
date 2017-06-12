import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guard/auth-guard.service';

import { UserpageComponent } from './userpage.component';
import { UserMyPageComponent } from './mypage/userMyPage.component';
import { UserTextBagComponent } from './textBag/userTextBag.component';
import { UserSTDAdminComponent } from './userStudyAdmin/userSTDAdmin.component';
import { UserSTDJoinComponent } from './userStudyJoin/userSTDJoin.component';
import { UserSTDSearchComponent } from './userStudySearch/userSTDSearch.component';
import { 
	UserTextShareComponent, 
	UserTextShareNewComponent
} from './textShare/userTextShare.component';
const userRoutes: Routes = [
	{
		path: '', component: UserpageComponent,
		canActivateChild: [AuthGuard],
		children: [
			{path: '', component: UserSTDAdminComponent},
			{path: 'mypage', component: UserMyPageComponent},
			{path: 'textShare', component: UserTextShareComponent},
			{path: 'textShareNew', component: UserTextShareNewComponent},
			{path: 'textShareNew/:idx', component: UserTextShareNewComponent},
			{path: 'textBag', component: UserTextBagComponent},
			{path: 'stdJoin', component: UserSTDJoinComponent},
			{path: 'stdAdmin', component: UserSTDAdminComponent},
			{path: 'stdSearch', component: UserSTDSearchComponent}
		]
	},
]

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);