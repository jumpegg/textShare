import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    styleUrls: ['client/component/study/flow/study_flow.component.css'],
    templateUrl: 'client/component/study/flow/study_flow.component.html'
})
export class StudyFlow {
    public title:string;
    constructor(){
        this.title = "this is study flow";
    }
}