import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserInfo } from '../../service/single_user';
import { PageInfo } from '../../service/single_info';
import { StudyInfo } from '../../service/single_study';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/study.component.css'],
		templateUrl: 'client/component/study/study.component.html'
})
export class StudyComponent {
		public title:string;
		constructor(
			public userInfo:UserInfo,
			public pageInfo:PageInfo,
			public studyInfo:StudyInfo
		){
			this.title = "this is study";
		}
		ngOnInit(){
			$('.dropdown-botton').dropdown();
		}
}