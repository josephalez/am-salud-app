import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss'],
})
export class CheckoutConfirmComponent implements OnInit {

  constructor (
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
