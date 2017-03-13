import {Component} from '@angular/core';

@Component({
    selector:'index',
    templateUrl: 'client/component/index/index.component.html'
})
export class IndexComponent{
    public title:String;
    constructor(){
        this.title = "Index Page";
    }

}
