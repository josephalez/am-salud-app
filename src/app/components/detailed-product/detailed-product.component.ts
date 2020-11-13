import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/carts/cart.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.scss'],
})
export class DetailedProductComponent implements OnInit {
  countCard = 0;
  @Input() producto: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  cantidad = 0;
  constructor (
    private modalCtrl: ModalController,
    private cartService: CartService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.cantidad = 1;
    this.cartService.countProduct.subscribe((res) => {
      this.countCard = res;
    });
  }
  closeModalcard() {
    this.closeModal(true);
  }
  closeModal(open = false) {
    this.modalCtrl.dismiss({ opencard: open });
  }

  add_cantidad(add) {
    if (add < 0) {
      if (this.cantidad == 1) {
        return;
      }
    }
    this.cantidad += add;
    if (this.cantidad < 0) {
      this.cantidad = 1;
    }
  }
  agregar() {
    this.cartService.insertar({
      cantidad: this.cantidad,
      product_id: this.producto.id
    }).then((res) => {
      this.alertService.alertSuccess("El producto se cargo correctamente ");
    }).catch((e) => {
    });
  }
}
