import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/notice/study_notice.component.css'],
    templateUrl: 'client/component/study/notice/study_notice.component.html'
})
export class StudyNotice {
    public title:string;
    constructor(){
        this.title = "this is study notice";
    }
}