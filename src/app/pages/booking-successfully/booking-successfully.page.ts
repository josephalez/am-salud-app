import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-successfully',
  templateUrl: './booking-successfully.page.html',
  styleUrls: ['./booking-successfully.page.scss']
})
export class BookingSuccessfullyPage implements OnInit {
  constructor(
    public modalController: ModalController,
    public navCrtl: NavController
  ) {}

  ngOnInit() {}
  continueBooking() {
    this.modalController.dismiss();
    this.navCrtl.navigateRoot('salon-detail');
  }
  gotoAppoinment() {
    this.modalController.dismiss();
    this.navCrtl.navigateRoot('tabs/profile');
  }
}
