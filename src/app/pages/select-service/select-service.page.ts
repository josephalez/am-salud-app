import {
  NavController
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.page.html',
  styleUrls: ['./select-service.page.scss']
})
export class SelectServicePage implements OnInit {
  gender: any = 'Woman';
  selectOp1: any = {
    header: 'Hair Color'
  };
  selectOp2: any = {
    header: 'Spa'
  };
  selectOp3: any = {
    header: 'Make up'
  };
  selectOp4: any = {
    header: 'Facial'
  };
  selectOp5: any = {
    header: 'Hair color'
  };
  selectOp6: any = {
    header: 'Bridal'
  };
  selectOp7: any = {
    header: 'Nail'
  };
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  backPage() {
    this.navCtrl.back();
  }
  continue () {
    this.navCtrl.navigateForward('/book-appointment');
  }
  changeGenderValue(e) {
    this.gender = e.detail.value;
  }
}