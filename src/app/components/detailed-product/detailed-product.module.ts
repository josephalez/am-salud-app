import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterMediaModule } from '../footer-media/footer-media.module';
import { IonicModule } from '@ionic/angular';
import { NavbarModule } from '../navbar/navbar.module';
import { DetailedProductComponent } from './detailed-product.component';



@NgModule({
  declarations: [
    DetailedProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NavbarModule,
    FooterMediaModule,
  ],
  exports:[
    DetailedProductComponent
  ]
})
export class DetailedProductModule { }
