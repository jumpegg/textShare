import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/index/study_index.component.css'],
    templateUrl: 'client/component/study/index/study_index.component.html'
})
export class StudyIndex {
    public title:string;
    constructor(){
        this.title = "this is study Index";
    }
}