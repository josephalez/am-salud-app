import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StripeCardFormComponent } from './stripe-card-form.component';
import { FooterMediaModule } from '../footer-media/footer-media.module';



@NgModule({
  declarations: [
    StripeCardFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FooterMediaModule,
    ReactiveFormsModule,
  ],
  exports:[
    StripeCardFormComponent    
  ]
})
export class StripeCardFormModule { }
