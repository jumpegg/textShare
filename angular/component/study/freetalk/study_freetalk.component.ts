import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/freetalk/study_freetalk.component.css'],
		templateUrl: 'client/component/study/freetalk/study_freetalk.component.html',
		providers: [StudyService, FreetalkService]
})
export class StudyFreetalk {
		public fList:any[] = [];
		public listNum:number[] = [];
		public curNum:number = 1;
		public endNum:number;
		constructor(
			public studyPage:StudyPageInfo,
			public freetalkService:FreetalkService,
			public router:Router
		){}
		ngOnInit(){
			this.studyPage.init();
			this.getList(this.curNum);
			this.calCnt(this.curNum);
		}
		getList(input){
			this.freetalkService
			.pagingList(input)
			.subscribe(
				data=>{
					this.fList = data;
				}
			)
		}
		move_page(input){
			this.curNum = input;
			this.getList(input);
			this.calCnt(this.curNum);
		}
		calCnt(input){
			this.listNum = [];
			this.freetalkService
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
		move_read(input){
			this.router.navigate(['/study/freetalkRead/'+input]);
		}
}