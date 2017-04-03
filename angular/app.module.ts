import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { UserpageComponent } from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent} from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

import { AppRoutingModule } from './app.routing';

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
      UserIndexComponent,
      UserMyPageComponent,
      UserTextShareComponent,
      UserTextBagComponent,
      UserSTDJoinComponent,
      UserSTDAdminComponent,
      UserSTDSearchComponent
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule{
    constructor(router: Router){

    }
}
