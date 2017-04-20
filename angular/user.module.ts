import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { UserpageComponent } from './component/userpage/userpage.component';
import { UserIndexComponent } from './component/userpage/index/userindex.component';
import { UserMyPageComponent } from './component/userpage/mypage/userMyPage.component';
import { UserTextShareComponent } from './component/userpage/textShare/userTextShare.component';
import { UserTextBagComponent} from './component/userpage/textBag/userTextBag.component';
import { UserSTDJoinComponent } from './component/userpage/userStudyJoin/userSTDJoin.component';
import { UserSTDAdminComponent } from './component/userpage/userStudyAdmin/userSTDAdmin.component';
import { UserSTDSearchComponent } from './component/userpage/userStudySearch/userSTDSearch.component';

@NgModule({
    imports:[],
    declarations: [
        UserpageComponent,
        UserIndexComponent,
        UserMyPageComponent,
        UserTextShareComponent,
        UserTextBagComponent,
        UserSTDJoinComponent,
        UserSTDAdminComponent,
        UserSTDSearchComponent,
    ],
    exports: [
        UserpageComponent,
        UserIndexComponent,
        UserMyPageComponent,
        UserTextShareComponent,
        UserTextBagComponent,
        UserSTDJoinComponent,
        UserSTDAdminComponent,
        UserSTDSearchComponent,
    ]
})

export class UserModule{

}