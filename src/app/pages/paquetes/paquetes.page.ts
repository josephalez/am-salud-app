import { Component, OnInit } from '@angular/core';
import { CreditService } from '../../services/credit/credit.service';
import { AlertService } from '../../services/alert/alert.service';
import { CONSTANTES } from '../../constants/constants';
import { PaquetesService } from '../../services/paquetes/paquetes.service';
import { CardService } from 'src/app/services/card/card.service';
import { ModalController } from '@ionic/angular';
import { StripeCardFormComponent } from 'src/app/components/stripe-card-form/stripe-card-form.component';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.page.html',
  styleUrls: [
    './paquetes.page.scss',
    "../../styles/payments-style.scss",
    "../../styles/reserve-style.scss"
  ],
})

export class PaquetesPage implements OnInit {

  credits: any[] = [];
  paquetes: any[] = [];

  cards: any[] = [];
  cardId = -1;

  selectedCredit: number = 0;
  selectedPaquete: number = -1;
  typepayment: number = -1;
  typePaymentConekta: number = 3;

  constructor (
    private creditService: CreditService,
    private alertService: AlertService,
    private paquetesService: PaquetesService,
    private cardservice: CardService,
    private modalCtrl: ModalController
  ) { }
  comprarPaquete() {
    const paq = this.paquetes[this.selectedPaquete];
    const data = {
      saldo: ((paq.points * 1) + (paq.points * (paq.bonus / 100))),
      monto: paq.points,
      paquete_id: paq.id,
      typepayment: this.typepayment,
      credit_id: paq.credit_id,
      card_id: this.cardId

    };
    console.log(data);

    this.paquetesService.getComprarPaquete(this.cardId, data).then(() => {
      this.alertService.alertSuccess('Paquete comprado');
      this.cardId = -1;
      this.selectedPaquete = -1;
    }).catch((e) => {
      console.log(e);
    });
  }
  async ngOnInit() {
    console.log('credit init')
    await this.fetchCreditTypes();
    this.getCardCredits();
  }
  selectCard(id, typepayment) {
    this.typepayment = typepayment;
    this.cardId = id;
  }
  getCardCredits() {
    this.cardservice.getCards().then((data) => {
      console.log(data);
      this.cards = data;
    }).catch((e) => {
      console.log(e);
    });
  }

  async fetchCreditTypes() {
    try {

      let req = await this.creditService.getCreditTypes();
      console.log("esto esta aqui");
      console.log("credit types", req);
      this.credits = req.data;

    } catch (error) {
      this.alertService.alertError(CONSTANTES.MESSAGES.error)
    }
  }

  async fetchPaquetes() {
    try {

      let req = await this.paquetesService.getPaquetes(this.selectedCredit);
      console.log('paquetes', req.data);
      this.paquetes = req.data;
      console.log(this.paquetes);
      this.selectedPaquete = -1;

    } catch (error) {
      this.alertService.alertError(CONSTANTES.MESSAGES.error)
    }
  }

  onselectPackage($event) {
    console.log('estoy aqui y tu lo sabes **************');
    console.log($event);
    this.selectedPaquete = $event;
  }


  async addCard() {

    let modal = await this.modalCtrl.create({
      component: StripeCardFormComponent,
      mode: "ios",
    });

    await modal.present();

    modal.onDidDismiss().then((res) => {
      console.log(res);
      if (res.data.recarga) {
        this.getCardCredits();
      }
      console.log("modal dismissed")
    })

  }

}
