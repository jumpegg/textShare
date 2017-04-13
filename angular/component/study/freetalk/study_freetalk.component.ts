import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/freetalk/study_freetalk.component.css'],
    templateUrl: 'client/component/study/freetalk/study_freetalk.component.html'
})
export class StudyFreetalk {
    public title:string;
    constructor(){
        this.title = "this is study Freetalk";
    }
}