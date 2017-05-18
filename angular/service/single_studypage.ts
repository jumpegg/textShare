import { Injectable, OnInit } from '@angular/core';
import { StudyInfo } from '../service/single_study';

@Injectable()
export class StudyPageInfo{
		public tabList: any[];
		public url:string;
		public title:string = "title test";
		public need:boolean = false;

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
			this.need = true;
		}else if(this.url == 'freetalk' || this.url == 'notice'){
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
			];
			this.need = true;
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
			];
			this.need = true;
		}else if(this.url == 'accountNew' || this.url == 'index'){
			this.title = this.url.toUpperCase();
			this.tabList = [
				{
					name : '',
					link : ''
				}
			];
			this.need = false;
		}
	}

}