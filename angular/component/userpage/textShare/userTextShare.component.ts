import { Component } from '@angular/core';

@Component({
    templateUrl: 'client/component/userpage/textShare/userTextShare.component.html'
})
export class UserTextShareComponent{
    private title:string;
    constructor(){
        this.title = "this is TextShare";
    }
}
