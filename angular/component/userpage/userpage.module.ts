import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { userRouting } from './userpage.routing';

import { UserpageComponent } from './userpage.component';
import { UserMyPageComponent } from './mypage/UserMyPage.component';
import { UserTextBagComponent } from './textBag/UserTextBag.component';
import { UserSTDAdminComponent } from './userStudyAdmin/userSTDAdmin.component';
import { UserSTDJoinComponent } from './userStudyJoin/userSTDJoin.component';
import { UserSTDSearchComponent } from './userStudySearch/userSTDSearch.component';
import { 
	UserTextShareComponent, 
	UserTextShareNewComponent
} from './textShare/UserTextShare.component';

@NgModule({
	imports : [
		userRouting,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule
	],
	declarations : [
		UserpageComponent,
		UserMyPageComponent,
		UserTextBagComponent,
		UserSTDAdminComponent,
		UserSTDJoinComponent,
		UserSTDSearchComponent,
		UserTextShareComponent, 
		UserTextShareNewComponent
	]
})
export class UserpageModule {}