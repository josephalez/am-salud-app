import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FooterMediaModule } from '../footer-media/footer-media.module';
import { LaserFormComponent } from './laser-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LaserFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FooterMediaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    LaserFormComponent
  ]
})
export class LaserFormModule { }
