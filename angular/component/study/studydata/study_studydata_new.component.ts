import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

@Component({
		styleUrls: ['client/component/study/studydata/study_studydata_new.component.css'],
		templateUrl: 'client/component/study/studydata/study_studydata_new.component.html',
		providers: [StudyService],
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

		constructor(
			public studyPage:StudyPageInfo,
			public router:Router,
			public route:ActivatedRoute
		){}
		ngOnInit(){
			this.studyPage.init();
			this.idx = +this.route.snapshot.params['idx'];
			console.log(this.idx);
		}
		fileInputToggle(){
			this.fileState = (this.fileState == "close") ? "open" : "close";
		}
		fileSubmit(input){
			console.log(input);
		}



		fileChange(event) {
			console.log('event call');
				let fileList: FileList = event.target.files;
				if(fileList.length > 0) {
					console.log(fileList);
						// let file: File = fileList[0];
						// let formData:FormData = new FormData();
						// formData.append('uploadFile', file, file.name);
						// let headers = new Headers();
						// headers.append('Content-Type', 'multipart/form-data');
						// headers.append('Accept', 'application/json');
						// let options = new RequestOptions({ headers: headers });
						// this.http.post(`${this.apiEndPoint}`, formData, options)
						// 		.map(res => res.json())
						// 		.catch(error => Observable.throw(error))
						// 		.subscribe(
						// 				data => console.log('success'),
						// 				error => console.log(error)
						// 		)
				}
		}
}