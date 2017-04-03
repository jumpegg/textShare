import { Component } from '@angular/core';

@Component({
    templateUrl: 'client/component/userpage/textBag/userTextBag.component.html'
})
export class UserTextBagComponent{
    private title:string;
    constructor(){
        this.title = "this is mypage";
    }
}
