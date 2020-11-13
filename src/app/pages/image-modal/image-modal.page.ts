import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss']
})
export class ImageModalPage implements OnInit {
  @ViewChild('slider', { static: true }) slider: ElementRef;
  img: any = [];
  defaultOpen: 0;
  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    setTimeout(() => {
      this.slider.nativeElement.slideTo(this.defaultOpen);
    }, 100);
  }

  ngOnInit() {
    this.img = this.navParams.get('img');
    this.defaultOpen = this.navParams.get('index');
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
