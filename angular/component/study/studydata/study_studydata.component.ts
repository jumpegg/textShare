import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/studydata/study_studydata.component.css'],
    templateUrl: 'client/component/study/studydata/study_studydata.component.html'
})
export class StudyData {
    public title:string;
    constructor(){
        this.title = "this is study studydata";
    }
}