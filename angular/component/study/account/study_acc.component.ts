import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/account/study_acc.component.css'],
    templateUrl: 'client/component/study/account/study_acc.component.html'
})
export class StudyAcc {
    public title:string;
    constructor(){
        this.title = "this is study account";
    }
}