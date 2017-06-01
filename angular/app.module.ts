import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
// import { TreeModule } from 'tree-component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { PageInfo } from './global/single_info';
import { UserInfo } from './global/single_user';
import { StudyInfo } from './global/single_study';
import { StudyPageInfo } from './global/single_studypage';
import { Vali } from './global/single_vali';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';

import { MyDatePickerModule } from 'mydatepicker';

import { AppRoutingModule } from './app.routing';

@NgModule({
	imports: [
			BrowserModule,
			FormsModule, 
			ReactiveFormsModule,
			HttpModule,
			AppRoutingModule,
			MyDatePickerModule,
			BrowserAnimationsModule,
			MaterialModule,
	],
	declarations: [
		AppComponent,
		IndexComponent, 
	],
	providers:[
		PageInfo,
		StudyInfo,
		StudyPageInfo,
		UserInfo,
		Vali
	],
	bootstrap: [
			AppComponent
	]
})
export class AppModule{
		constructor(router: Router){}
}
