import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaquetesPage } from './paquetes.page';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { PaqueteModule } from '../../components/paquete/paquete.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { StripeCardFormModule } from 'src/app/components/stripe-card-form/stripe-card-form.module';

const routes: Routes = [
    {
        path: '',
        component: PaquetesPage
    }
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FooterMediaModule,
        PaqueteModule,
        NavbarModule,
        IonicModule,
        StripeCardFormModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PaquetesPage]
})
export class PaquetesPageModule { }
