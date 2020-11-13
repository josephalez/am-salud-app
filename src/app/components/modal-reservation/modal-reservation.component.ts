import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.scss'],
})
export class ModalReservationComponent implements OnInit {

  @Input() reservationType:string='normal';

  constructor(
    private modalCtr:ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtr.dismiss();
  }

}
