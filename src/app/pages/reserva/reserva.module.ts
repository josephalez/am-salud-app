import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReservaPage } from './reserva.page';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HourBlockTableModule } from '../../components/hour-block-table/hour-block-table.module';
import { ConfirmModule } from '../../components/confirm/confirm.module';
import { ContractModule } from '../../contract/contract.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { StripeCardFormModule } from '../../components/stripe-card-form/stripe-card-form.module';
import { ModalReservationModule } from '../../components/modal-reservation/modal-reservation.module';
import { HourBlockTableComponent } from './hour-block-table/hour-block-table.component';

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarModule,
    ModalReservationModule,
    // HourBlockTableModule,
    StripeCardFormModule,
    FooterMediaModule,
    ContractModule,
    ConfirmModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReservaPage, HourBlockTableComponent]
})
export class ReservaPageModule { }
