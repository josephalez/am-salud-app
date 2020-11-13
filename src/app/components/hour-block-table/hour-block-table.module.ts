import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourBlockTableComponent } from './hour-block-table.component';
import { IonicModule } from '@ionic/angular';
import { FooterMediaModule } from '../footer-media/footer-media.module';



@NgModule({
  declarations: [
    HourBlockTableComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FooterMediaModule,
  ],
  exports:[
    HourBlockTableComponent
  ],
})
export class HourBlockTableModule { }
