
import {NgModule} from '@angular/core';
import {
    MdButtonModule, 
    MdCheckboxModule, 
    MdMenuModule,
    MdToolbarModule,
    
} from '@angular/material';
const list = [
    MdButtonModule, 
    MdCheckboxModule, 
    MdMenuModule, 
    MdToolbarModule,
];

@NgModule({
  imports: list,
  exports: list,
})
export class MaterialModule { }