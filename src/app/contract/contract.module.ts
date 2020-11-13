import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractComponent } from './contract.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[
    ContractComponent
  ]
})
export class ContractModule { }
