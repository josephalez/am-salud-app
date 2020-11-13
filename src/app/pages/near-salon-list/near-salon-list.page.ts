import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-near-salon-list',
    templateUrl: './near-salon-list.page.html',
    styleUrls: ['./near-salon-list.page.scss']
})
export class NearSalonListPage implements OnInit {
    salonList: any = [
        {
            name: 'RedBox Barber',
            image: 'https://placehold.it/100x83',
            address: '288 McClure Court, Arkansas',
            distance: '1.2 km',
            star: '3.5',
            time: '8:30 am - 9:00pm'
        },
        {
            name: 'Beauty Plus Spa',
            image: 'https://placehold.it/100x83',
            address: '34 McClure Court, Arkansas',
            distance: '3.0 km',
            star: '4.0',
            time: '8:30 am - 9:00pm'
        },
        {
            name: 'Looks Unisex Salon',
            image: 'https://placehold.it/100x83',
            address: '85 McClure Court, Arkansas',
            distance: '4.0 km',
            star: '3.5',
            time: '9:00 am - 8:00pm'
        }
    ];
    constructor (
        public modalController: ModalController,
        public navCtrl: NavController
    ) { }

    ngOnInit() { }

    viewSalonDetauil() {
        this.modalController.dismiss();
        this.navCtrl.navigateForward('/salon-detail');
    }
}
