import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './component/index/index.component';
import { UserpageComponent } from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';

import { AuthGuard } from './service/auth-guard.service';
import { UserService} from './service/user.service';

const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    // {path: 'userpage', component: UserpageComponent, canActivate: [AuthGuard]}
    {
        path: 'userpage',
        component: UserpageComponent,
        canActivate: [AuthGuard],
        children:[{
            path: '',
            // canActivateChild: [AuthGuard],
            children: [
                {path: 'index', component: UserIndexComponent}
            ]
        }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule],
    providers: [AuthGuard,UserService]
})
export class AppRoutingModule {
    constructor(){

    }
}
