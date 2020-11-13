import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServiciosPage } from './servicios.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';

const routes: Routes = [
  {
    path: '',
    component: ServiciosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarModule,
    FooterMediaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServiciosPage]
})
export class ServiciosPageModule {}
