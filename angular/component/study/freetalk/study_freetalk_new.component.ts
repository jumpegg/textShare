import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { StudyPageInfo } from '../../../global/single_studypage';

import { Freetalk } from '../../../vo/freetalk';

@Component({
	styleUrls: ['client/component/study/freetalk/study_freetalk_new.component.css'],
	templateUrl: 'client/component/study/freetalk/study_freetalk_new.component.html',
	providers: [StudyService, FreetalkService]
})
export class StudyNewFreetalk {
	public newFreetalk:Freetalk = new Freetalk();
	private idx:number;
	constructor(
		public studyPage:StudyPageInfo,
		public freetalkService:FreetalkService,
		public router:Router,
		public route:ActivatedRoute
	){}
	ngOnInit(){
		this.studyPage.init();
		this.idx = +this.route.snapshot.params['idx'];
			if(this.idx){
				this.freetalkService
				.getOne(this.idx)
				.subscribe(
					data=>{
						this.newFreetalk = data[0];
					}
				)
			}
	}
	freetalkSubmit(input){
		if(!input.title){
			alert('제목을 입력해주세요');
		}else if(input.title.trim().length == 0){
			alert('제목을 입력해주세요');
		}else if(input.title.trim().length > 30){
			alert('제목의 길이는 30자 이하로 정해주세요');
		}else if(!input.content){
			alert('내용을 입력해주세요');
		}else if(input.content.trim().length == 0){
			alert('내용을 입력해주세요');
		}else{
			this.freetalkCreate(input);
		}
	}
	freetalkCreate(input){
		if(input.idx){
			this.freetalkService
			.update(input)
			.subscribe(
				data=>{
					if(data.msg == "done"){
						alert('등록되었습니다.');
						this.router.navigate(['/study/freetalk']);
					}
				}
			)
		}else{
			this.freetalkService
			.create(input)
			.subscribe(
				data=>{
					if(data.msg == "done"){
						alert('등록되었습니다.');
						this.router.navigate(['/study/freetalk']);
					}
				}
			)
		}
	}
	backFreetalk(){
		this.router.navigate(['/study/freetalk']);
	}
}