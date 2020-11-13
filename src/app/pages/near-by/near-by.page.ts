import { FilterPage } from './../filter/filter.page';
import { EnableLocationPage } from './../enable-location/enable-location.page';
import { NearSalonListPage } from './../near-salon-list/near-salon-list.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.page.html',
  styleUrls: ['./near-by.page.scss']
})
export class NearByPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  searchText: any;
  salonList: any = [
    {
      name: 'RedBox Barber',
      image: '../../../assets/images/General/Rectangle.png',
      address: '288 McClure Court, Arkansas',
      star: '4.0'
    },
    {
      name: 'Looks Unisex Salon',
      image: '../../../assets/images/General/Rectangle.png',
      address: '288 McClure Court, Arkansas',
      star: '4.0'
    }
  ];
  constructor(
    public modalController: ModalController,
    public navCtrl: NavController
  ) {
    this.enableLocation();
  }

  async enableLocation() {
    const modal = await this.modalController.create({
      component: EnableLocationPage,
      cssClass: 'enableLocation-modal'
    });
    return await modal.present();
  }
  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const markerData: any = [
      { lat: 22.3, lng: 70.8, text: 'Looks Unisex Salon' },
      { lat: 22.3, lng: 70.81, text: 'Beauty Plus Spa' },
      { lat: 22.31, lng: 70.8, text: 'RedBox Barber' },
      { lat: 22.33, lng: 70.81, text: 'Divine Salon' }
    ];

    const latLng = new google.maps.LatLng(22.32, 70.81);
    const mapoption = {
      center: latLng,
      zoom: 15,
      streetViewControl: false,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapoption);
    const markerIcon = {
      url: '../../../assets/images/near-by/map-image.png',
      labelOrigin: new google.maps.Point(25, 63),
      scaledSize: new google.maps.Size(56, 64)
    };
    const markerIconCurrent = {
      url: '../../../assets/images/near-by/nevigation-icon.gif',
      scaledSize: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 17)
    };
    markerData.forEach((element: any, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.lat, element.lng),
        map: this.map,
        icon: markerIcon,

        label: {
          text: element.text,
          fontSize: '11px',
          fontFamily: 'tofini_medium',
          width: '30px'
        }
      });
    });

    const marker4 = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: markerIconCurrent
    });

    const circle = new google.maps.Circle({
      map: this.map,
      radius: 400, // 10 miles in metres
      fillColor: '#007AFF',
      strokeWeight: 0,
      fillOpacity: 0.1
    });
    circle.bindTo('center', marker4, 'position');
  }

  async openNearModal() {
    const modal = await this.modalController.create({
      component: NearSalonListPage,
      cssClass: 'nearSalon-modal'
    });
    return await modal.present();
  }
  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterPage
    });
    return await modal.present();
  }
  searchCancel() {
    this.searchText = '';
  }
}
