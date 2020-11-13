import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FooterMediaModule } from '../footer-media/footer-media.module';
import { DetailedMemberComponent } from './detailed-member.component';



@NgModule({
  declarations: [
    DetailedMemberComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FooterMediaModule,
  ],
  exports:[
    DetailedMemberComponent,
  ]
})
export class DetailedMemberModule { }
