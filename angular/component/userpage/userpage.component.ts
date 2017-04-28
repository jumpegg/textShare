import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {PageInfo} from '../../service/single_info';

declare var $ : any;
@Component({
    selector: 'userpage',
    templateUrl: 'client/component/userpage/userpage.component.html',
    styleUrls: ['client/component/userpage/userpage.component.css'],
    providers: [ UserService ]
})
export class UserpageComponent {
    public id:string;
    public test:Object;

    constructor(private userService:UserService, private route:ActivatedRoute, public page:PageInfo){
        this.userService.chkSess().subscribe(
            data => {},
            error => console.log(error)
        )
    }
    ngOnInit(){
        this.test = this.route.snapshot.data['userResolve'];
        $(".button-collapse").sideNav({
            edge: 'right'
        });
        $('ul.tabs').tabs(); 
    }
    

}
