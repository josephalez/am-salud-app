import { BookingSuccessfullyPage } from './../booking-successfully/booking-successfully.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss']
})
export class BookingDetailPage implements OnInit {
  paymentType: any = 'Bank Account';
  constructor(
    public modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  backPage() {
    this.navCtrl.back();
  }
  async continue() {
    const modal = await this.modalController.create({
      component: BookingSuccessfullyPage,
      cssClass: 'success-modal'
    });
    return await modal.present();
  }

  gotoAppoinment() {}
  chnagePaymentMethod(e) {
    this.paymentType = e.detail.value;
  }
}
