import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enable-location',
  templateUrl: './enable-location.page.html',
  styleUrls: ['./enable-location.page.scss']
})
export class EnableLocationPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  done() {
    this.modalController.dismiss();
  }
}
