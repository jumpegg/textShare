import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {IndexComponent} from './component/index/index.component';
import {UserpageComponent} from './component/userpage/userpage.component';

import {AppRoutingModule} from './app.routing';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      IndexComponent,
      UserpageComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule{}
