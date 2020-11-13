import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  IonSlides,
  ModalController,
  AlertController
} from '@ionic/angular';
import {
  ConfirmComponent
} from '../../components/confirm/confirm.component';
import {
  WorkerService
} from '../../services/worker/worker.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  HourBlockTableComponent
} from '../../components/hour-block-table/hour-block-table.component';
import * as moment from 'moment'
import {
  ReservationService
} from '../../services/reservation/reservation.service';
import {
  AlertService
} from '../../services/alert/alert.service';
import { ContractComponent } from '../../contract/contract.component';
import { UserService } from '../../services/user/user.service';
import { StripeCardFormComponent } from '../../components/stripe-card-form/stripe-card-form.component';
import { ModalReservationComponent } from '../../components/modal-reservation/modal-reservation.component';
import { CardService } from 'src/app/services/card/card.service';
import { CreditService } from 'src/app/services/credit/credit.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: [
    './reserva.page.scss',
    "../../styles/clinics-style.scss",
    "../../styles/table-style.scss",
    "../../styles/payments-style.scss",
    "../../styles/reserve-style.scss"
  ]
})

export class ReservaPage implements OnInit {


  @ViewChild('IonSlider', {
    static: false
  }) slides: IonSlides;

  @ViewChild('HourBlockTable', {
    static: false
  }) hourBlockTable: HourBlockTableComponent;

  service: any = 1;

  workerName: string = '';

  selectedWorker: any = null;

  reservation_start: string = '';
  reservation_end: string = '';

  title: string = '';

  activePayment: number = null;

  reservationType: string = 'normal';

  currentSlide: number = 1;

  selectedUser: number = null;
  cards: any[];
  typePaymentConekta = 3;
  typepayment: number = null;
  payments: any[] = [
    {
      label: "Tarjeta de Crédito/Débito Stripe",
      subtitle: "******",
    },
    {
      label: "AMSalud Cash",
      subtitle: "",
    }
  ];
  monto = 0;
  asociados = [];
  saldoE = 0;
  descuento = 0;
  totalsin = 0;
  descuentoTotal = 0;
  citas: any[] = [];
  constructor (
    private modalCtrl: ModalController,
    private workerService: WorkerService,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private alertService: AlertService,
    private alertController: AlertController,
    private userService: UserService,
    private cardservice: CardService,
    private creditService: CreditService
  ) { }

  async ngOnInit() {

    this.route.params.subscribe(async paramsObserver => {
      let {
        service,
        title
      } = paramsObserver;
      this.service = service;
      this.title = title;
      this.currentSlide = 1;
      await this.fetchAsociados()
      //if (this.slides ? true : false) {
      //  while (!await this.slides.isBeginning()) {
      //    this.slides.slidePrev();
      //  }
      //}
    });
    this.getCard();
    this.creditService.getSaldo().then((res) => {
      let sal = res.find((ele, index, ar) => {
        return ele.credit_id == 1
      });
      if (typeof sal !== "undefined" && typeof sal.saldo !== "undefined") {
        this.saldoE = parseInt(sal.saldo);
      } else {
        this.saldoE = 0;
      }
    });
    await this.getDescuentos();
  }
  async getDescuentos() {
    let descuento = await this.userService.getDescuento(1);
    this.descuento = descuento;
  }
  async getCard() {
    const res = await this.cardservice.getCards();
    this.cards = res;
  }

  async fetchAsociados() {

    this.asociados = await this.userService.associatedLabels();

  }

  async addCard() {

    let modal = await this.modalCtrl.create({
      component: StripeCardFormComponent,
      mode: "ios",
    });

    await modal.present();

    modal.onDidDismiss().then(() => {
      this.getCard();
    })

  }

  async reserve($event: any) {
    console.log($event);
    const resp = await this.workerService.getPrice($event.worker.id);

    //this.monto = resp.tarifa;

    this.totalsin = this.monto = parseInt($event.selectCita.tarifa);
    this.descuentoTotal = 0;

    if (this.descuento > 0) {
      this.descuentoTotal = parseInt(((this.descuento / 100) * this.totalsin) + '');
      this.monto = parseInt((this.totalsin - this.descuentoTotal) + '');
    }


    this.workerName = $event.worker.name;

    this.selectedWorker = $event.worker.id;

    this.reservation_start = moment($event.dayMoment.date.format('YYYY-MM-DD') + ' ' + $event.reservation_start).format('YYYY-MM-DD HH:mm');
    this.reservation_end = moment($event.dayMoment.date.format('YYYY-MM-DD') + ' ' + $event.reservation_end).format('YYYY-MM-DD HH:mm');



    let confirmModal = await this.modalCtrl.create({
      component: ConfirmComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    /*confirmModal.onDidDismiss().then(()=>{});*/
    this.goDetail();
  }

  async goPayments() {

    if (!this.asociados.length) {
      this.currentSlide++;
      //this.modalContract();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Usuarios asociados',
      mode: 'ios',
      inputs: this.asociados,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.selectedUser = data;
            this.currentSlide++;
            //this.modalContract();
          }
        }
      ]
    });


    alert.present()

  }

  async modalContract() {
    let confirmModal = await this.modalCtrl.create({
      component: ContractComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    confirmModal.onDidDismiss().then(() => {

      //this.slides.slideNext();
      this.currentSlide++;

    }
    );
  }

  goDetail() {
    this.currentSlide++;
  }
  getDate() {
    return this.reservation_start != "" ? moment(this.reservation_start, 'YYYY-MM-DD HH:mm').locale('es').format("ddd MMMM DD YYYY, h:mm a") : "";
  }
  backCalendar() {
    //this.slides.slidePrev();
    this.currentSlide--;
  }

  selectPayment(i: number, typepayment) {
    this.activePayment = i;
    this.typepayment = typepayment
  }

  async makeReservation() {
    try {
      let card_id = null;

      let asociado = null;

      if (this.selectedUser) {

        asociado = this.selectedUser;
      }

      if (this.typepayment === this.typePaymentConekta) {
        card_id = this.cards[this.activePayment].id;
      }


      let params = {
        reservation_start: this.reservation_start,
        reservation_end: this.reservation_end,
        card_id,
        typepayment: this.typepayment,
        monto: this.monto,
        asociado,
        descuento: this.descuentoTotal,
        por: this.descuento,
        total: this.totalsin
      };
      let req = await this.reservationService.storeReservation(params, this.selectedWorker);

      await this.finalAlert();

    } catch (err) {
      if (err.status == 422) {
        for (let errorIndex in err.error) {
          err.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage))
        }
      } else {
        this.alertService.alertError(err.error.error);
      }
    }
  }

  async finalAlert() {

    let firstModal = await this.modalCtrl.create({
      component: ModalReservationComponent,
      showBackdrop: false,
      cssClass: "confirm-modal",
      componentProps: {
        reservationType: 'first_time'
      }
    });

    firstModal.present();

    firstModal.onDidDismiss()
      .then(async () => {
        await this.congratsModal()
      })
  }

  async congratsModal() {
    let secondModal = await this.modalCtrl.create({
      component: ModalReservationComponent,
      showBackdrop: false,
      cssClass: "confirm-modal",
      componentProps: {
        reservationType: this.reservationType
      }
    });

    await secondModal.present();

    secondModal.onDidDismiss()
      .then(() => {
        this.router.navigateByUrl('home');
      })
  }

  changeType($event) {

    this.reservationType = $event.detail.value

  }

}