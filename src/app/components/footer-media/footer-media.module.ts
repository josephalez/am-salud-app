import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterMediaComponent } from './footer-media.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FooterMediaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    FooterMediaComponent
  ]
})
export class FooterMediaModule { }
