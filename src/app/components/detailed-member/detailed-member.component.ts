import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detailed-member',
  templateUrl: './detailed-member.component.html',
  styleUrls: ['./detailed-member.component.scss'],
})
export class DetailedMemberComponent implements OnInit {

  @Input() member: any;

  img = '/assets/images/default/user.png';

  constructor (
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.img = this.member.profile_picture ? this.member.profile_picture : '/assets/images/default/user.png';
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  openInstagram() {
    window.open('instagram://user?username=' + this.member.instagram, '_system');
    return false;
  }

}
