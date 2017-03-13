import {Component} from '@angular/core';

@Component({
    selector: 'userpage',
    templateUrl: 'client/component/userpage/userpage.component.html'
})
export class UserpageComponent {
    private title:String;
    constructor(){
        this.title = "userpage";
    }

}
