import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyPageInfo } from '../../../service/single_studypage';
import { StudyInfo } from '../../../service/single_study';

declare var $ : any;
declare var naver : any;

@Component({
		styleUrls: ['client/component/study/index/study_index.component.css'],
		templateUrl: 'client/component/study/index/study_index.component.html',
		providers: []
})
export class StudyIndex {
		public title:string;
		public map: any;
		constructor(
			public studyPage:StudyPageInfo,
			public studyInfo:StudyInfo,
			public router:Router
		){}

		ngOnInit(){
			this.studyPage.init();
			this.map = new naver.maps.Map('map', {
				center: new naver.maps.LatLng(37.3595704, 127.105399),
				zoom: 5
			});
		}

}