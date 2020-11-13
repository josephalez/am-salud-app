import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.page.html',
  styleUrls: ['./otpverification.page.scss']
})
export class OTPVerificationPage implements OnInit {
  opt: any = {};
  @ViewChild('a', { static: true }) a;
  constructor(private navCtrl: NavController) {
    setTimeout(() => {
      this.a.setFocus();
    }, 200);
  }

  ngOnInit() {}
  backPage() {
    this.navCtrl.back();
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
  }
  resendCode() {
    this.navCtrl.back();
  }
  continue() {
    this.navCtrl.navigateRoot('/tabs');
  }
}
