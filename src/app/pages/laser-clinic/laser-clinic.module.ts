import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LaserClinicPage } from './laser-clinic.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HourBlockTableModule } from '../../components/hour-block-table/hour-block-table.module';
import { ConfirmModule } from '../../components/confirm/confirm.module';
import { ContractModule } from '../../contract/contract.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { StripeCardFormModule } from '../../components/stripe-card-form/stripe-card-form.module';
import { LaserFormModule } from '../../components/laser-form/laser-form.module';
import { ModalReservationModule } from '../../components/modal-reservation/modal-reservation.module';
import { WarnModalModule } from '../../components/warn-modal/warn-modal.module';

const routes: Routes = [
  {
    path: '',
    component: LaserClinicPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarModule,
    FooterMediaModule,
    StripeCardFormModule,
    ModalReservationModule,
    LaserFormModule,
    ConfirmModule,
    ContractModule,
    WarnModalModule,
    HourBlockTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LaserClinicPage]
})
export class LaserClinicPageModule {}
