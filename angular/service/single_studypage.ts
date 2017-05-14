import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class StudyPageInfo{
		public tabList: any[];
		public url:string;
		public title:string = "title test";

	init(){
		let urlList = document.location.hash.split('/');
		let params = urlList[urlList.length - 1].split('?');
		this.url = params[0];

		if(this.url == 'schedule' || this.url == 'scheduleNew' || this.url == 'account' || this.url == 'admin'){
			this.title = '운영';
			this.tabList = [
				{
					name : 'Schedule',
					link : 'schedule'
				},
				{
					name : 'Account',
					link : 'account'
				},
				{
					name : 'Members',
					link : 'admin'
				}
			];
		}else if(this.url == 'freetalk' || this.url == 'notice' || this.url == 'index'){
			this.title = '게시판';
			this.tabList = [
				{
					name : '공지사항',
					link : 'notice'
				},
				{
					name : '자유게시판',
					link: 'freetalk'
				}
			]
		}else if(this.url == 'flow' || this.url == 'data'){
			this.title = "자료실";
			this.tabList = [
				{
					name : 'Flow',
					link : 'flow'
				},
				{
					name : 'Data',
					link: 'data'
				}
			]
		}
	}

}