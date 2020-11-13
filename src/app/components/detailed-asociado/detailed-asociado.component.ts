import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detailed-asociado',
  templateUrl: './detailed-asociado.component.html',
  styleUrls: ['./detailed-asociado.component.scss'],
})
export class DetailedAsociadoComponent implements OnInit {

  @Input() asociado:any;

  constructor(
    private modalCtr:ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtr.dismiss();
  }

}
