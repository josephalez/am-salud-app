import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaqueteComponent } from './paquete.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PaqueteComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    PaqueteComponent
  ]
})
export class PaqueteModule { }
