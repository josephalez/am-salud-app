import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss']
})
export class FilterPage implements OnInit {
  serviceList: any = [
    'Hairstyle',
    'Makeup',
    'Hair Coloring',
    'Spa',
    'Facial Makeup',
    'Trim & Saving'
  ];
  activeSerice: any = 'Facial Makeup';
  activeSortType: any = 'Most Popular';
  ratingValue: any = 3;
  gender: any = 'Woman';
  distance: any = { lower: 0, upper: 5 };
  activePrice: any = 2;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }
  reset() {
    this.modalCtrl.dismiss();
  }
  setRating(val) {
    this.ratingValue = val;
  }
  setService(service) {
    this.activeSerice = service;
  }

  setSortType(type) {
    this.activeSortType = type;
  }
  setPrice(type) {
    this.activePrice = type;
  }
  applyFilter() {
    this.modalCtrl.dismiss();
  }
  changeGenderValue(e) {
    this.gender = e.detail.value;
  }
}
