import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from '../../services/alert/alert.service';
import { ReservationService } from '../../services/reservation/reservation.service';
import { ActionSheetController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {

  @Input() reservation: any;

  @Output() refresh: any = new EventEmitter;

  constructor (
    private alertService: AlertService,
    private reservationService: ReservationService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.reservation.canceled = this.reservation.canceled != "0";
    this.reservation.confirmed = this.reservation.confirmed != "0";
  }

  getParsedWeekDay() {
    return moment(this.reservation.reservation_start).locale('es').format('dddd');
  }

  getParsedDate() {
    return moment(this.reservation.reservation_start).locale('es').format('D MMMM');
  }

  async reagendar() {
    try {

    } catch (err) {

    }
  }

  getParsedHour() {
    return moment(this.reservation.reservation_start).format('hh:mm a');
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Que desea hacer',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Confirmar',
        role: 'confirmar',
        icon: 'checkmark',
        handler: async () => {
          const rest = await this.reservationService.confirmedReservation(this.reservation.id);
          this.reservation.confirmed = "1";
        }
      }, {
        text: 'Cancelar',
        role: 'cancelar',
        icon: 'trash',
        handler: async () => {
          const rest = await this.reservationService.canceledReservation(this.reservation.id);
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }



}
