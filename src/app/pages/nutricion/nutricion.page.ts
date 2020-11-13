import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { WorkerService } from '../../services/worker/worker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HourBlockTableComponent } from '../../components/hour-block-table/hour-block-table.component';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.page.html',
  styleUrls: [
    './nutricion.page.scss',
    "../../styles/clinics-style.scss",
    "../../styles/table-style.scss",
    "../../styles/payments-style.scss",
    "../../styles/reserve-style.scss"
  ]
})
export class NutricionPage implements OnInit {

  @ViewChild('IonSlider', { static: false }) slides: IonSlides;

  @ViewChild('HourBlockTable', { static: false }) hourBlockTable: HourBlockTableComponent;

  service: any = 1;

  cards: any[];

  constructor (
    private modalCtrl: ModalController,
    private workerService: WorkerService,
    private route: ActivatedRoute,
    private cardservice: CardService,
  ) { }

  async ngOnInit() {
    if (0) this.route.params.subscribe(paramsObserver => {
      let { service } = paramsObserver;
      this.service = service;

    });
    this.getCard();
  }
  async getCard() {
    const res = await this.cardservice.getCards();
    this.cards = res;
  }

  async reserve() {
    let confirmModal = await this.modalCtrl.create({
      component: ConfirmComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    confirmModal.onDidDismiss().then(() => this.slides.slideNext());
  }

  backCalendar() {
    this.slides.slidePrev();
  }

}
