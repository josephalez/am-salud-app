import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() mainPicture: string = null;
  @Input() name: string = null;
  @Input() description: string = null;
  @Input() price: string = null;

  @Output() view: any = new EventEmitter;

  constructor () { }

  ngOnInit() {
  }

  getImageUrl() {

    return this.mainPicture;

    //return this.main_picture?AppSettings.apiUrl+'/'+this.mainPicture:'/assets/images/default/user.png';
  }

  emitView() {
    this.view.emit('modal');
  }

}
