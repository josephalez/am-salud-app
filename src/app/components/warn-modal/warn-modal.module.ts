import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WarnModalComponent } from './warn-modal.component';



@NgModule({
  declarations: [
    WarnModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    WarnModalComponent
  ]
})
export class WarnModalModule { }
