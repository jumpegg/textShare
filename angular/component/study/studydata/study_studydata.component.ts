import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../service/single_studypage';

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
			])
		]
})
export class StudyData {
		public folder_name:string = "";
		public inputState:string="close";
		public folderList:any[] = [];
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
					this.folderList = data;
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