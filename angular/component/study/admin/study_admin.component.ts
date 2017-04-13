import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/admin/study_admin.component.css'],
    templateUrl: 'client/component/study/admin/study_admin.component.html'
})
export class StudyAdmin {
    public title:string;
    constructor(){
        this.title = "this is study admin";
    }
}