import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss',"../../styles/auth-page.scss", "../../styles/confirm-modal.scss"],
})
export class ConfirmComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}


  close(){
    this.modalCtrl.dismiss();
  }

}
