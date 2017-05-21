import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/notice/study_notice.component.css'],
		templateUrl: 'client/component/study/notice/study_notice.component.html',
		providers: [StudyService, NoticeService]
})
export class StudyNotice {
		public nList:any[] = [];
		public listNum:number[] = [];
		public curNum:number = 1;
		public endNum:number;
		constructor(
			public studyPage:StudyPageInfo,
			public noticeService:NoticeService,
			public router:Router
		){}
		ngOnInit(){
			this.studyPage.init();
			this.getList(this.curNum);
			this.calCnt(this.curNum);
		}
		getList(input){
			this.noticeService
			.pagingList(input)
			.subscribe(
				data=>{
					this.nList = data;
				}
			)
		}
		move_page(input){
			this.curNum = input;
			this.getList(input);
			this.calCnt(this.curNum);
		}
		move_read(input){
			this.router.navigate(['/study/noticeRead/'+input]);
		}
		calCnt(input){
			this.listNum = [];
			this.noticeService
			.getCnt()
			.subscribe(
				data=>{
					let listCnt = Number(data[0].cnt);
					let res = Math.ceil(listCnt/7);
					this.endNum = res;
					let listLen = Math.ceil(Number(this.curNum)/10);
					listLen = (listLen*10 > res) ? res : listLen*10;
					for(let i=listLen-10; i<listLen; i++){
						this.listNum.push(i+1);
					}
				}
			)
		}
		addNum(){
			this.curNum = (this.curNum == this.endNum) ? this.endNum : this.curNum + 1;
			this.move_page(this.curNum);
		}
		subNum(){
			this.curNum = (this.curNum == 1) ? 1 : this.curNum - 1;
			this.move_page(this.curNum);
		}
}