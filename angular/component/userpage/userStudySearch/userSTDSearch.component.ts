import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { PageInfo } from '../../../global/single_info';
import { fadeInAnimation } from '../../animation/fadein';

@Component({
	templateUrl: 'client/component/userpage/userStudySearch/userSTDSearch.component.html',
	styleUrls: ['client/component/userpage/userStudySearch/userSTDSearch.component.css'],
	providers: [StudyService],
	animations: [fadeInAnimation]
})
export class UserSTDSearchComponent{
	public studyList:any[] = [];
	public searchText:string = "";
	private pageState:Boolean = false;
	constructor(
		public page:PageInfo,
		private router:Router,
		public studyService:StudyService
	){}

	ngOnInit(){
		this.page.init();
		this.getLatestList();
	}
	getLatestList(){
		this.studyService
		.studyLatest()
		.subscribe(
			data=>{
				this.studyList = data;
				this.pageState = true;
			}
		)
	}
	studySearch(){
		this.pageState = false;
		this.studyService
		.studyTextSearch({search : this.searchText})
		.subscribe(
			data=>{
				if(data.msg){
					this.studyList = [];
					this.pageState = true;
				}else{
					this.studyList = data;
					this.pageState = true;
				}
			}
		)
	}
	move_study(input){
		this.studyService
		.studyEnter(input)
		.subscribe(
			data => console.log(data)
		)
		this.router.navigate(['/study']);
	}
}
