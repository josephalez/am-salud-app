import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsociadosPage } from './asociados.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { DetailedAsociadoModule } from '../../components/detailed-asociado/detailed-asociado.module';

const routes: Routes = [
  {
    path: '',
    component: AsociadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FooterMediaModule,
    DetailedAsociadoModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AsociadosPage]
})
export class AsociadosPageModule {}
