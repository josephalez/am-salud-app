import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, AlertController } from '@ionic/angular';
import { LaserZoneService } from '../../services/laser-zone/laser-zone.service';
import { AlertService } from '../../services/alert/alert.service';
import * as moment from 'moment';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ContractComponent } from 'src/app/contract/contract.component';
import { StripeCardFormComponent } from '../../components/stripe-card-form/stripe-card-form.component';
import { ModalReservationComponent } from '../../components/modal-reservation/modal-reservation.component';
import { WarnModalComponent } from '../../components/warn-modal/warn-modal.component';
import { CardService } from 'src/app/services/card/card.service';
import { CONSTANTES } from 'src/app/constants/constants';
import { CreditService } from 'src/app/services/credit/credit.service';


@Component({
  selector: 'app-laser-clinic',
  templateUrl: './laser-clinic.page.html',
  styleUrls: [
    './laser-clinic.page.scss',
    '../../styles/clinics-style.scss',
    '../../styles/table-style.scss',
    '../../styles/payments-style.scss',
    '../../styles/confirm-modal.scss',
    '../../styles/reserve-style.scss'
  ],
})
export class LaserClinicPage implements OnInit {

  @ViewChild('IonSlider') slides: IonSlides;
  @ViewChild('IonSlider2') slides2: IonSlides;

  zones: any[] = [];
  slide: number = null;
  slide2: number = null;
  selectedZones: any[] = [];

  currentPage = 1;
  lastPage = 1;

  totalTime = '00:00';

  workerName = '';

  selectedWorker: number = null;

  reservation_start = '';

  reservation_end = '';

  activePayment: number = null;

  selectedUser: number = null;
  typePaymentConekta = 3;
  typepayment: number = null;

  laserForm:any=null;

  asociados: any = [];
  cards: any = [];
  saldoE = 0;
  hayAsociados: boolean = null;
  userPrimera: boolean = null;
  listo = false;
  descuento = 0;
  totalsin = 0;
  descuentoTotal = 0;
  totalPrice = 0;
  constructor (
    private laserZoneService: LaserZoneService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private service: UserService,
    private cardservice: CardService,
    private creditService: CreditService
  ) { }
  ionViewWillEnter() {
    this.laserForm=null;
    if (this.listo) {
      this.listo = false;
    } else {
      this.listo = false;
      this.inicio();
    }
  }
  ngOnDestroy() {
    this.typepayment = null;
    this.selectedUser = null;
    this.slide = null;
    this.slide2 = null;
  }
  async ngOnInit() {
    this.listo = true;
    await this.getDescuentos();
    await this.fetchLaserZones();
    const user = await this.service.getPrimeraVez();
    this.userPrimera = user;
    this.getCard();
    this.creditService.getSaldo().then((res) => {
      let sal = res.find((ele, index, ar) => {
        return ele.credit_id == 2
      });
      if (typeof sal !== "undefined" && typeof sal.saldo !== "undefined") {
        this.saldoE = parseInt(sal.saldo);
      } else {
        this.saldoE = 0;
      }
    });
    await this.fetchAsociados();

    this.inicio();
  }
  goBack2() {
    // tslint:disable-next-line: triple-equals
    if (this.slide2 == 0) {
      this.slides2 = null;
      this.inicio();
      return;
    }
    this.slides2.slidePrev();
    this.slide2--;
  }
  goBack() {
    // tslint:disable-next-line: triple-equals
    if (this.slide == 0) {
      this.slide = null;
      this.inicio();
      return;
    }
    this.slides.slidePrev();
    this.slide--;
  }
  async inicio() {
    this.typepayment = null;
    this.selectedUser = null;
    this.slide = null;
    this.slide2 = null;
    if (this.asociados.length) {
      this.hayAsociados = true;
      const alert = await this.alertController.create({
        header: 'Usuarios asociados',
        mode: 'ios',
        inputs: this.asociados,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              this.initDos();
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              //data sera el id del usuario asociado
              this.selectedUser = data;
              //this.modalContract();
              this.initDos();

            }
          }
        ]
      });
      let tu = await alert.present();

    } else {
      this.hayAsociados = false;
      this.initDos();
      //
    }
  }

  async getDescuentos() {
    let descuento = await this.service.getDescuento(2);
    this.descuento = descuento;
  }

  async initDos() {
    let primera;
    if (this.selectedUser) {
      const user = this.asociados.find(res => {
        return res.value === this.selectedUser;
      });
      primera = user.primera;
    } else {
      primera = JSON.parse(await localStorage.getItem(CONSTANTES.LOCAL_STORAGE.primeraVez));
      primera = this.userPrimera;

    }
    if (primera) {
      const alert = await this.alertController.create({
        header: 'Es su primera vez?',
        mode: 'ios',
        buttons: [
          {
            text: 'si',
            cssClass: 'secondary',
            handler: () => {
              this.slide2 = 0;
              this.totalTime = '00:00';
              this.typepayment = 1;
            }
          }, {
            text: 'no',
            handler: (data) => {
              this.slide = 0;
            }
          }
        ]
      });
      let tu = await alert.present();
    } else {
      this.slide = 0;
    }
  }

  async getCard() {
    const res = await this.cardservice.getCards();
    this.cards = res;
  }
  async fetchAsociados() {
    this.asociados = await this.service.associatedLabels();
  }

  async addCard() {

    let modal = await this.modalCtrl.create({
      component: StripeCardFormComponent,
      mode: "ios",
    });

    await modal.present();

    modal.onDidDismiss().then(() => {

    })

  }

  async fetchLaserZones(page = this.currentPage) {
    try {
      let req = await this.laserZoneService.getZones(page);
      this.currentPage = req.current_page;
      this.lastPage = req.last_page;
      this.zones = req.data;
    } catch (err) {
      this.alertService.alertError('Error al traer las zonas a depilar')
    }
  }

  async selectZone(zoneId: number, retoque: boolean = false) {
    let zone = await this.selectedZones.find(el => el.id === zoneId);

    let pushZone = false;

    if (zone ? true : false) {
      pushZone = true;
      if (retoque) {
        if (zone.inRetoque) zone.inRetoque = false;
        else {
          zone.inRetoque = true;
          zone.normal = false;
        }
      } else {
        if (zone.normal) zone.normal = false;
        else {
          zone.normal = true;
          zone.inRetoque = false;
        }
      }
    }

    if (pushZone) {
      if (zone.normal || zone.inRetoque) this.selectedZones = [...await this.selectedZones.filter(el => el.id != zone.id), zone];
      else this.selectedZones = await this.selectedZones.filter(el => el.id != zone.id);
    }

    else {
      zone = await this.zones.find(el => el.id === zoneId);
      let type = {
        normal: retoque ? false : true,
        inRetoque: retoque ? true : false,
      }
      if (zone ? true : false) {
        this.selectedZones.push({
          ...zone,
          ...type
        });
      }
    }

    let totalTime = moment().startOf('day');
    let totalPrice = 0;

    await this.selectedZones.map(el => {
      let minutes = el.inRetoque ? el.time_retoque : el.time_completo;
      let value = parseFloat(el.inRetoque ? el.retoque : el.completo);

      let minutesCount = moment(minutes, 'mm:ss:SS').minutes();
      totalTime.add(minutesCount, 'minutes');

      totalPrice += value;

    });

    this.totalTime = totalTime.format('HH:mm');
    this.totalsin = this.totalPrice = totalPrice;
    this.descuentoTotal = 0;

    if (this.descuento > 0) {
      this.descuentoTotal = parseInt(((this.descuento / 100) * totalPrice) + '');

      this.totalPrice = parseInt((totalPrice - this.descuentoTotal) + '');
    }
  }

  isChecked(zoneId: number, retoque: boolean = false) {
    let zone = null;
    this.selectedZones.map(el => {
      if (el.id == zoneId) {
        if (retoque) {
          if (el.inRetoque) {
            zone = el;
          }
        } else {
          if (el.normal) {
            zone = el;
          }
        }
      }
    })
    if (zone) return true;
    return false;
  }

  selectPayment(i: number, typepayment) {

    this.activePayment = i;
    this.typepayment = typepayment
  }


  toSchedule(laserForm) {
    this.laserForm=laserForm
    this.slides.slideNext()
    this.slide++;
  }

  async reserve($event: any) {

    this.workerName = $event.worker.name;

    this.selectedWorker = $event.worker.id;

    try {
      this.reservation_start = moment($event.dayMoment.date.format('YYYY-MM-DD') + ' ' + $event.reservation_start).format('YYYY-MM-DD HH:mm');
      this.reservation_end = moment($event.dayMoment.date.format('YYYY-MM-DD') + ' ' + $event.reservation_end).format('YYYY-MM-DD HH:mm');
    } catch (error) {
      alert(JSON.stringify(error));
    }







    let confirmModal = await this.modalCtrl.create({
      component: ConfirmComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    this.slides.slideNext();
    this.slide++;
  }
  async reserve2($event: any) {

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
    this.slides2.slideNext();
    this.slide2++;
  }
  getParsedTime(timeString) {
    return moment(timeString, 'mm:ss:SS').format('HH:mm');
  }

  getDate() {
    return this.reservation_start != "" ? moment(this.reservation_start, 'Y-MM-DD HH:mm').locale('es').format("ddd MMMM D YYYY, h:mm a") : "";
  }

  goCalendar() {
    this.slides.slidePrev();
    this.slide--;
  }

  async goPayment() {
    this.modalContract();
  }

  async warnModal() {
    let warnModal = await this.modalCtrl.create({
      component: WarnModalComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });

    warnModal.present();
    warnModal.onDidDismiss()
      .then((obj) => {
        if (obj.data.ok) {
          this.slides.slideNext();
          this.slide++;
        }
      })
  }

  async modalContract2() {
    if (this.selectedUser) {
      let user = this.asociados.find(res => {
        return res.value === this.selectedUser;
      });
      if (user.maryor) {
        this.slides2.slideNext();
        this.slide2++;
        return;
      }
    } else {
      const user = await localStorage.getItem(CONSTANTES.LOCAL_STORAGE.usuario);
      if (JSON.parse(user).birthday) {
        if (this.service.edad(JSON.parse(user).birthday)) {
          this.slides2.slideNext();
          this.slide2++;
          return;
        } else {

        }

      } else {
        this.slides2.slideNext();
        this.slide2++;
        return;
      }
    }
    let confirmModal = await this.modalCtrl.create({
      component: ContractComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    confirmModal.onDidDismiss().then(() => {
      this.slides2.slideNext();
      this.slide2++;
    }
    );
  }


  async modalContract() {
    if (this.selectedUser) {
      let user = this.asociados.find(res => {
        return res.value === this.selectedUser;
      });
      if (user.maryor) {
        this.slides.slideNext();
        this.slide++;
        return;
      }
    } else {
      const user = await localStorage.getItem(CONSTANTES.LOCAL_STORAGE.usuario);
      if (JSON.parse(user).birthday) {
        if (this.service.edad(JSON.parse(user).birthday)) {
          this.slides.slideNext();
          this.slide++;
          return;
        } else {

        }

      } else {
        this.slides.slideNext();
        this.slide++;
        return;
      }
    }
    let confirmModal = await this.modalCtrl.create({
      component: ContractComponent,
      cssClass: 'confirm-modal',
      showBackdrop: false,
    });
    confirmModal.present();
    confirmModal.onDidDismiss().then(() => {
      this.slides.slideNext();
      this.slide++;
    }
    );
  }

  async makeReservation() {
    try {

      let card_id = null;
      let asociado = null;

      if (this.selectedUser) {

        asociado = this.selectedUser;
      }

      let zonas = [];

      this.selectedZones.forEach((value) => {

        let monto = value.inRetoque ? value.retoque : value.completo;
        zonas.push({
          zone: value.id,
          monto_zona: monto,
          is_retoque: value.inRetoque
        })
      });

      if (this.typepayment === this.typePaymentConekta) {
        card_id = this.cards[this.activePayment].id;
      }

      let params = {
        reservation_start: this.reservation_start,
        reservation_end: this.reservation_end,
        card_id,
        monto: this.totalPrice,
        typepayment: this.typepayment,
        zonas,
        asociado,
        descuento: this.descuentoTotal,
        por: this.descuento,
        total: this.totalsin
      };

      if(this.laserForm){
        params= {
          ...params,
          ...this.laserForm
        }
      }

      let req = await this.reservationService.storeReservation(params, this.selectedWorker);

      await this.congratsModal();
      this.typepayment = null;
      this.selectedUser = null;
      this.slide = null;
      this.slide2 = null;

    } catch (err) {

      if (err.status == 422) {
        for (let errorIndex in err.error) {
          err.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage))
        }
      }
      else {
        this.alertService.alertError(err.error.error);
      }
    }
  }

  async congratsModal() {
    let secondModal = await this.modalCtrl.create({
      component: ModalReservationComponent,
      showBackdrop: false,
      cssClass: "confirm-modal",
      componentProps: {
        reservationType: 'normal'
      }
    });

    await secondModal.present();

    secondModal.onDidDismiss()
      .then(() => {
        this.router.navigateByUrl('home');
      })
  }
}