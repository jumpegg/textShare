import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { FreetalkService } from '../../../service/freetalk.service';
import { StudyPageInfo } from '../../../service/single_studypage';

import { Freetalk } from '../../../vo/freetalk';

@Component({
	styleUrls: ['client/component/study/freetalk/study_freetalk_new.component.css'],
	templateUrl: 'client/component/study/freetalk/study_freetalk_new.component.html',
	providers: [StudyService, FreetalkService]
})
export class StudyNewFreetalk {
	public newFreetalk:Freetalk = new Freetalk();
	
	constructor(
		public studyPage:StudyPageInfo,
		public freetalkService:FreetalkService,
		public router:Router
	){}
	ngOnInit(){
		this.studyPage.init();
	}

	freetalkSubmit(input){
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
	backFreetalk(){
		this.router.navigate(['/study/freetalk']);
	}
}