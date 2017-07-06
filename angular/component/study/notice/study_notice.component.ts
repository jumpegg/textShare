import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { NoticeService } from '../../../service/notice.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { fadeInAnimation } from '../../animation/fadein';

@Component({
		styleUrls: ['client/component/study/notice/study_notice.component.css'],
		templateUrl: 'client/component/study/notice/study_notice.component.html',
		providers: [StudyService, NoticeService],
		animations: [fadeInAnimation]
})
export class StudyNotice {
		private nList:any[] = [];
		private listNum:number[] = [];
		private curNum:number = 1;
		private endNum:number;
		private no_notice:boolean = false;
		private pageState:Boolean = false;
		private listState:Boolean = false;
		private pagerState:Boolean = false;
		constructor(
			private studyPage:StudyPageInfo,
			private noticeService:NoticeService,
			private router:Router
		){}
		ngOnInit(){
			this.studyPage.init();
			this.getList(this.curNum);
			this.calCnt(this.curNum);
		}
		readyChk(){
			if(this.listState && this.pagerState){
				this.pageState = true;
			}
		}
		getList(input){
			this.pageState = false;
			this.noticeService
			.pagingList(input)
			.subscribe(
				data=>{
					if(!data.msg){
						this.nList = data;
					}
					this.listState = true;
					this.readyChk();
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
			this.pageState = false;
			this.listNum = [];
			this.noticeService
			.getCnt()
			.subscribe(
				data=>{
					if(data[0].cnt != 0){
						let listCnt = Number(data[0].cnt);
						let res = Math.ceil(listCnt/7);
						this.endNum = res;
						let listLen = Math.ceil(Number(this.curNum)/10);
						listLen = (listLen*10 > res) ? res : listLen*10;
						for(let i=listLen-10; i<listLen; i++){
							this.listNum.push(i+1);
						}
						this.pagerState = true;
						this.readyChk();
					}else{
						this.no_notice = true;
						this.pagerState = true;
						this.readyChk();
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