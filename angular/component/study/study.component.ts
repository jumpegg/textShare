import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/study.component.css'],
    templateUrl: 'client/component/study/study.component.html'
})
export class StudyComponent {
    public title:string;
    constructor(){
        this.title = "this is study";
    }
}