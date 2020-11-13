import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ReservationComponentModule } from '../../components/reservation/reservation.module';
import { StripeCardFormModule } from '../../components/stripe-card-form/stripe-card-form.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { PedidoModule } from 'src/app/components/pedido/pedido.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StripeCardFormModule,
    FooterMediaModule,
    NavbarModule,
    RouterModule.forChild(routes),
    ReservationComponentModule,
    PedidoModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule { }
