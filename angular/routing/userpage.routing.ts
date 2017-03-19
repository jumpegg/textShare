import { Routes } from '@angular/router';
import { UserIndexComponent } from '../component/userpage/index/userindex.component';

export const userRoutes: Routes = [
    {path: '', redirectTo: '/index'},
    {path: 'index', component: UserIndexComponent}
]
