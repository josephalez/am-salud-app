import { CodeSendModalPage } from './../code-send-modal/code-send-modal.page';
import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  email: any;
  constructor(
    private navCtrl: NavController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  backPage() {
    this.navCtrl.back();
  }

  async resetPassword() {
    const modal = await this.modalController.create({
      component: CodeSendModalPage,
      cssClass: 'code-modal'
    });
    return await modal.present();
  }
}
