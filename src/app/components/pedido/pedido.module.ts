import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { DetalleComponent } from './detalle/detalle.component';



@NgModule({
  declarations: [PedidoComponent, DetalleComponent],
  imports: [
    CommonModule
  ],
  exports: [PedidoComponent]
})
export class PedidoModule { }
