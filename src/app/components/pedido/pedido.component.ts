import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { DetalleComponent } from './detalle/detalle.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  constructor (private modalCtrl: ModalController, private servicePedidos: PedidosService) { }

  pedidos = [];

  async ngOnInit() {

    this.pedidos = await this.servicePedidos.getMisPedidos().catch(err => { });

  }
  closeModal() {
    this.modalCtrl.dismiss();
  }


  async detalle(pedido) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        'pedido': pedido
      }
    });
    return await modal.present();
  }
}
