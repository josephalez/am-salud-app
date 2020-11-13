import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-verification',
  templateUrl: './phone-verification.page.html',
  styleUrls: ['./phone-verification.page.scss']
})
export class PhoneVerificationPage implements OnInit {
  code: any = 91;
  number: any = '8586023109';
  cities: any = [
    {
      name: 'India',
      value: 91,
      image: '../../../assets/images/General/indianFlag.png'
    }
  ];
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  clearNumber(event) {
    event.stopPropagation();
    this.number = '';
  }
  backPage() {
    this.navCtrl.back();
  }
  socilaLogin() {
    this.navCtrl.navigateRoot('/starter');
  }
  continue() {
    this.navCtrl.navigateForward('/otpverification');
  }
}
