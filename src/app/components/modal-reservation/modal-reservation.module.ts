import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalReservationComponent } from './modal-reservation.component';


@NgModule({
  declarations: [
    ModalReservationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    ModalReservationComponent    
  ],
})
export class ModalReservationModule { }
