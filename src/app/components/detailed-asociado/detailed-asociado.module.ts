import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailedAsociadoComponent } from './detailed-asociado.component';



@NgModule({
  declarations: [
    DetailedAsociadoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    DetailedAsociadoComponent
  ]
})
export class DetailedAsociadoModule { }
