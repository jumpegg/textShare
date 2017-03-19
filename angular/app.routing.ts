import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {IndexComponent} from './component/index/index.component';
import { UserpageComponent } from './component/userpage/userpage.component';


const routes: Routes = [
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'userpage',component: UserpageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(){

    }
}
