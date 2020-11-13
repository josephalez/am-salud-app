import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NosotrosPage } from './nosotros.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { DetailedMemberModule } from '../../components/detailed-member/detailed-member.module';

const routes: Routes = [
  {
    path: '',
    component: NosotrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    FooterMediaModule,
    DetailedMemberModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NosotrosPage]
})
export class NosotrosPageModule {}
