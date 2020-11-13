import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-warn-modal',
  templateUrl: './warn-modal.component.html',
  styleUrls: ['./warn-modal.component.scss', "../../styles/auth-page.scss"],
})
export class WarnModalComponent implements OnInit {

  constructor (
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  closeModal(ok: boolean = true) {
    this.modalCtrl.dismiss({ ok });
  }

}
