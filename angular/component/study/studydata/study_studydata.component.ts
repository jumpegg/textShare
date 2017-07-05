import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../global/single_studypage';
import { fadeInAnimation } from '../../animation/fadein'

@Component({
		styleUrls: ['client/component/study/studydata/study_studydata.component.css'],
		templateUrl: 'client/component/study/studydata/study_studydata.component.html',
		providers: [StudyService, DataService],
		animations:[
			trigger('folderToggle',[
				state('open', style({})),
				state('close', style({
					height: '0px',
					display: 'none'
				})),
				transition('open => close', animate('300ms ease-in')),
				transition('close => open', animate('300ms ease-out'))
			]),
			fadeInAnimation
		]
})
export class StudyData {
		private folder_name:string = "";
		private inputState:string="close";
		private folderList:any[] = [];
		private pageState:Boolean = false;
		constructor(
			public studyPage:StudyPageInfo,
			public dataService:DataService,
			public router:Router
		){}
		ngOnInit(){
			this.studyPage.init();
			this.getFolderList();
		}
		getFolderList(){
			this.dataService
			.getFolderList()
			.subscribe(
				data=>{
					if(!data.msg){
						this.folderList = data;
						this.pageState = true;
					}
				}
			)
		}
		toggleInput(){
			this.inputState = (this.inputState == 'close') ? 'open' : 'close';
		}
		moveDataFolder(input){
			this.router.navigate(['/study/datafile/'+input]);
		}
		makeFolder(input){
			this.dataService
			.createFolder({folder_name:input})
			.flatMap(
				data=>{
					if(data.msg == 'done'){
						alert('폴더를 생성했습니다.');
						this.inputState = 'close';
					}else{
						alert('폴더 생성 중 문제가 생겼습니다.');
					}
					return this.dataService.getFolderList();
				}
			)
			.subscribe(
				data=>{
					this.folderList = data;
					this.folder_name = "";
				}
			)
		}
}