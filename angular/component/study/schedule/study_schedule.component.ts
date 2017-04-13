import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MyDatePicker} from 'MyDatePicker/src/index';

@Component({
    styleUrls: ['client/component/study/schedule/study_schedule.component.css'],
    templateUrl: 'client/component/study/schedule/study_schedule.component.html'
})
export class StudySchedule {
    public title:string;
    constructor(){
        this.title = "this is study schedule";
    }
}