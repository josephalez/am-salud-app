import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TiendaPage } from './tienda.page';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { FooterMediaModule } from '../../components/footer-media/footer-media.module';
import { ProductModule } from '../../components/product/product.module';
import { DetailedProductModule } from '../../components/detailed-product/detailed-product.module';
import { CartcomponetComponent } from './cartcomponet/cartcomponet.component';
import { CheckoutConfirmComponent } from '../../components/checkout-confirm/checkout-confirm.component';

const routes: Routes = [
    {
        path: '',
        component: TiendaPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NavbarModule,
        ReactiveFormsModule,
        FooterMediaModule,
        ProductModule,
        DetailedProductModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TiendaPage, CartcomponetComponent, CheckoutConfirmComponent],
    entryComponents:[CheckoutConfirmComponent]
})
export class TiendaPageModule { }
