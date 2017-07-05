import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { userRouting } from './userpage.routing';

import { UserpageComponent } from './userpage.component';
import { UserMyPageComponent } from './mypage/userMyPage.component';
import { UserTextBagComponent } from './textBag/userTextBag.component';
import { UserSTDAdminComponent } from './userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './userStudySearch/userSTDSearch.component';
import { 
	UserTextShareComponent, 
	UserTextShareNewComponent
} from './textShare/userTextShare.component';

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
		UserSTDSearchComponent,
		UserTextShareComponent, 
		UserTextShareNewComponent
	]
})
export class UserpageModule {}