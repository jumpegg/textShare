import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Router} from '@angular/router';

import {AppComponent} from './app.component';
import {IndexComponent} from './component/index/index.component';
import {UserpageComponent} from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';

import {AppRoutingModule} from './app.routing';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule, ReactiveFormsModule,
      HttpModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      IndexComponent,
      UserpageComponent,
      UserIndexComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule{
    constructor(router: Router){

    }
}
