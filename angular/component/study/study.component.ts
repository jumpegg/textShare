import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../global/single_user';
import { PageInfo } from '../../global/single_info';
import { StudyInfo } from '../../global/single_study';
import { StudyPageInfo } from '../../global/single_studypage';

import { MemberService } from '../../service/member.service';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/study.component.css'],
		templateUrl: 'client/component/study/study.component.html',
		providers: [MemberService]
})
export class StudyComponent {
		public title:string;
		public member_chk:boolean = false;
		constructor(
			public userInfo:UserInfo,
			public pageInfo:PageInfo,
			public studyPage:StudyPageInfo,
			public studyInfo:StudyInfo,
			public memberService:MemberService
			){
				this.memberService.isMember()
				.subscribe(
					data=>{
						if(data.msg == 'member'){
							this.member_chk = true;
						}else if(data.msg == 'hoper'){
							this.member_chk = false;
						}else if(data.msg == 'guest'){
							this.member_chk = false;
						}
					}
				)
			}
		ngOnInit(){
			this.studyPage.init();
			
			$(".button-collapse").sideNav({
				edge: 'right'
			});

		}
}