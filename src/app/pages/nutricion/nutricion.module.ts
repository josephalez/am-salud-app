import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NutricionPage } from './nutricion.page';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HourBlockTableModule } from '../../components/hour-block-table/hour-block-table.module';

const routes: Routes = [
  {
    path: '',
    component: NutricionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NavbarModule,
    HourBlockTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NutricionPage],
  entryComponents: [ConfirmComponent, NavbarComponent]
})
export class NutricionPageModule {}
