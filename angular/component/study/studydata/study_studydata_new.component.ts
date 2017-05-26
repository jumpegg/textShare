import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { DataService } from '../../../service/data.service';
import { StudyPageInfo } from '../../../global/single_studypage';

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
		fileSubmit(){
			let chk_dupl = false;
			if(this.fileList.length > 0){
				for(let i=0; i<this.fileList.length; i++){
					if(this.getfileList.find(item=>{
						return (item.file_name == this.fileList[i].name);
					})){
						chk_dupl = true;
					}
				}
				if(chk_dupl){
					alert('중복되는 파일명이 있습니다.');
				}else{
					let formData:FormData = new FormData();

					for(let i=0; i<this.fileList.length; i++){
						let file: File = this.fileList[i];
						formData.append('uploadFile'+i , file, file.name);
					}

					this.http.post('/study/new_file_data/'+this.idx, formData)
						.map(res => res.json())
						.subscribe(
							data => {
								if(data.msg=='done'){
									alert('등록되었습니다.');
									this.initFileList();
								}else{
									alert('문제가 생겼습니다.');
									this.initFileList();
								}
							}
						)
				}
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
		backToStorage(){
			this.router.navigate(['/study/data']);
		}
}