import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StudyService } from '../../../service/study.service';
import { StudyPageInfo } from '../../../service/single_studypage';

import { Flow } from '../../../vo/flow';

declare var $ : any;

@Component({
		styleUrls: ['client/component/study/flow/study_flow.component.css'],
		templateUrl: 'client/component/study/flow/study_flow.component.html',
		providers: [StudyService]
})
export class StudyFlow {
		public title:string;
		public detailState:string = "close";
		public newFlow:Flow = new Flow();
		constructor(){
				this.title = "this is study flow";
		}
		ngOnInit(){
			$('.datepicker').pickadate({
			selectMonths: true, // Creates a dropdown to control month
			selectYears: 17, // Creates a dropdown of 15 years to control year
			format: 'yyyy-mm-dd'
		});
		}
		flowSubmit(input){
			input.speak_date = $('.datepicker').val();
		}
}