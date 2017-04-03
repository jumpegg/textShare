import { Component } from '@angular/core';

@Component({
    templateUrl: 'client/component/userpage/userStudySearch/userSTDSearch.component.html',
    styleUrls: ['client/component/userpage/userStudySearch/userSTDSearch.component.css']
})
export class UserSTDSearchComponent{
    private title:string;
    constructor(){
        this.title = "this is STDSearch";
    }
}
