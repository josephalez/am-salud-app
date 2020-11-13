import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ReservationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,    
  ],
  exports:[
    ReservationComponent
  ]
})
export class ReservationComponentModule { }
