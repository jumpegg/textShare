import {Component} from '@angular/core';

@Component({
    selector: 'index',
    templateUrl: 'client/component/userpage/index/userindex.component.html'
})
export class UserIndexComponent {
    private title: string;
    constructor(){
        this.title = "this is user index";
    }
}
