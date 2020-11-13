import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  mainSegment: any = 'My Bookings';
  subSegmnet: 'History';
  constructor(public navCtrl: NavController, public router: Router) {}

  ngOnInit() {}
  bookmark() {}
  backPage() {}
  segmentChanged() {}

  mainSegmentChange(event) {
    this.mainSegment = event.detail.value;
  }
  bookingSubSegment(event) {
    this.subSegmnet = event.detail.value;
  }
  logOut() {
    this.navCtrl.navigateRoot('/sign-in');
  }
}
