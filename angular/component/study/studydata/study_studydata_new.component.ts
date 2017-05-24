import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/studydata/study_studydata_new.component.css'],
		templateUrl: 'client/component/study/studydata/study_studydata_new.component.html',
		providers: [StudyService, DataService],
		animations:[
			trigger('fileToggle',[
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
export class StudyNewData {
		public idx:number;
		public fileState:string = "close";
		public fileTest:any;
		public fileList:FileList;
		public getfileList:any[] = [];
		

		constructor(
			public studyPage:StudyPageInfo,
			public dataService:DataService,
			public router:Router,
			private http:Http,
			public route:ActivatedRoute
		){}
		ngOnInit(){
			this.studyPage.init();
			this.idx = +this.route.snapshot.params['idx'];
			this.initFileList();
		}
		fileInputToggle(){
			this.fileState = (this.fileState == "close") ? "open" : "close";
		}
		fileSubmit(input){
			if(input.length > 0){
				console.log(input);
				let formData:FormData = new FormData();

				for(let i=0; i<this.fileList.length; i++){
					console.log(this.fileList[i]);
					let file: File = this.fileList[i];
					formData.append('uploadFile'+i , file, file.name);
				}

				this.http.post('/study/new_file_data/'+this.idx, formData)
					.map(res => res.json())
					.subscribe(
						data => {
							console.log(data);
							this.initFileList();
						}
					)
			}else{
				alert('파일을 선택해주세요');
			}
		}
		fileChange(event) {
				this.fileList = event.target.files;
		}
		initFileList(){
			this.dataService
			.getFileList(this.idx)
			.subscribe(
				data=>{
					if(!data.msg){
						this.getfileList = data;
					}else{
						this.getfileList = [{
							file_name : '등록된 파일이 없습니다.'
						}]
					}
				}
			)
		}
}