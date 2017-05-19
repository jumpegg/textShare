import { Injectable, OnInit } from '@angular/core';
import { StudyInfo } from '../service/single_study';

@Injectable()
export class StudyPageInfo{
		public tabList: any[];
		public url:string;
		public title:string = "title test";
		public need:boolean;

	init(){
		let urlList = document.location.hash.split('/');
		let params = urlList[urlList.length - 1].split('?');
		this.url = params[0];
		console.log(this.url);
		if(this.url == 'schedule' || this.url == 'scheduleNew' || this.url == 'account' || this.url == 'admin'){
			console.log('운영 called');
			this.need = false;
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
		}else if(this.url == 'freetalk' || this.url == 'notice'){
			console.log('게시판 called');
			this.need = false;
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
		}else if(this.url == 'flow' || this.url == 'data'){
			console.log('자료실 called');
			this.need = false;
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
		}else{
			console.log('else called');
			this.need = true;
			this.title = this.url.toUpperCase();
			this.tabList = [
				{
					name : '',
					link : ''
				}
			];
		}
	}

}