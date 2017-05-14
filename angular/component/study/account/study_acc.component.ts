import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/account/study_acc.component.css'],
		templateUrl: 'client/component/study/account/study_acc.component.html',
		providers: [StudyService],
		animations:[
			trigger('tableToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			])
		]
})
export class StudyAcc {
		public title:string;
		public tableState:string = 'close';
		constructor(
			public studyPage:StudyPageInfo
		){
				
		}
		ngOnInit(){
			this.studyPage.init();
		}
		tableOpener(){
			this.tableState = (this.tableState == 'close') ? 'open' : 'close';
		}
}