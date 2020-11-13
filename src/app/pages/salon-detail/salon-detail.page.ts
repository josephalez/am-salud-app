import { ImageModalPage } from './../image-modal/image-modal.page';
import { SharePage } from './../share/share.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salon-detail',
  templateUrl: './salon-detail.page.html',
  styleUrls: ['./salon-detail.page.scss']
})
export class SalonDetailPage implements OnInit {
  empployeeList: any = [
    {
      index: 1,
      image: 'https://placehold.it/57x56',
      name: 'Daniel William',
      post: 'Manager'
    },
    {
      index: 2,
      image: 'https://placehold.it/57x56',
      name: 'Kieran Dely',
      post: 'Sr. Barber'
    },
    {
      index: 3,
      image: 'https://placehold.it/57x56',
      name: 'Helen White',
      post: 'Makeup Artist'
    },
    {
      index: 4,
      image: 'https://placehold.it/57x56',
      name: 'Ben Jhonson',
      post: 'Hair Stylist'
    },
    {
      index: 5,
      image: 'https://placehold.it/57x56',
      name: 'Ben Jhonson',
      post: 'Sr. Berber'
    }
  ];
  services: any = [
    {
      title: 'Hairstyle',
      type: '10',
      color: '#FD6C57',
      icon: 'noun_hair_147163.png'
    },
    {
      title: 'Shaving',
      type: '6',
      color: '#FE9654',
      icon: 'noun_Razor Blade_1260924.png'
    },
    {
      title: 'Hairdryer',
      type: '4',
      color: '#615DD9',
      icon: 'noun_Dryer_1830788.png'
    },
    {
      title: 'Haircut',
      type: '8',
      color: '#1E9895',
      icon: 'noun_barbershop_79139.png'
    },
    {
      title: 'Hair Coloring',
      type: '4',
      color: '#3885FF',
      icon: 'noun_dye_2415211.png'
    }
  ];
  reviews: any = [
    {
      name: 'Julia Chan',
      time: '2 hours ago',
      text:
        'Ben Johnson is very friendly and polite. When I came to her in August 2019. She made a proper…',
      star: 3
    },
    {
      name: 'Rajat Kashyap',
      time: '3 months ago',
      text:
        'Ben Johnson is very friendly and polite. When I came to her in August 2019. She made a proper…',
      star: 1
    },
    {
      name: 'Rajat Kashyap',
      time: '3 months ago',
      text:
        'Ben Johnson is very friendly and polite. When I came to her in August 2019. She made a proper…',
      star: 1
    }
  ];
  galleryimg: any = [
    'https://placehold.it/165x142',
    'https://placehold.it/165x142',
    'https://placehold.it/165x142',
    'https://placehold.it/165x142'
  ];
  state: any = 1;
  activeStar: any = 3;
  avtiveSegment: any = 'About';
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  setRating(no) {
    this.activeStar = no;
  }
  backPage() {
    this.navCtrl.navigateRoot('/tabs');
  }
  bookmark() {}
  setEmployee(data) {}
  segmentChanged(event) {
    this.avtiveSegment = event.detail.value;
  }

  logScrolling(ev) {
    if (ev.detail.scrollTop >= 200) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
  book() {
    this.navCtrl.navigateForward('/select-service');
  }
  openPreview(img, ind) {
    this.modalController
      .create({
        component: ImageModalPage,
        componentProps: {
          img: img,
          index: ind
        },
        cssClass: 'my-modal'
      })
      .then(modal => {
        modal.present();
      });
  }
  serviceBooking() {
    this.navCtrl.navigateForward('/select-service');
  }
  async share() {
    const modal = await this.modalController.create({
      component: SharePage,
      cssClass: 'shareModal'
    });
    return await modal.present();
  }
}
