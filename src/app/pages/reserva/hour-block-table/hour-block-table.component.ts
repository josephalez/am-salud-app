import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { WorkerService } from '../../../services/worker/worker.service';
import { AlertService } from '../../../services/alert/alert.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'hour-block-table',
  templateUrl: './hour-block-table.component.html',
  styleUrls: [
    './hour-block-table.component.scss',
    '../../../styles/clinics-style.scss',
    "../../../styles/table-style.scss",
  ],
})
export class HourBlockTableComponent implements OnInit {
  @ViewChild('IonSlider') slides: IonSlides;

  @Output() continue: any = new EventEmitter();

  @Output() back: any = new EventEmitter();

  @Input() service: any;

  @Input() laserClinic: boolean = false;

  sessionTime: string = null;
  @Input() mostrar: boolean = true;

  workers: any[] = [];

  selectedHour: any = {
    day: 0,
    time: ''
  }

  days: any[] = [];

  selectedWorker: any = null;

  hours: any[] = [];
  slide = 0;
  citas = [];

  selectCita = null;

  constructor (
    private workerService: WorkerService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    await this.refreshData();
    console.log(moment("00:00", "HH:mm").add(180, 'minutes').format("HH:mm"));
  }

  backButton() {
    this.back.emit('back');
  }
  fnselectCita(cita) {
    this.selectCita = cita;
  }

  async refreshData() {
    console.log(this.service)
    let proffesionals = await this.workerService.getProffessionalsByService(this.service);

    console.log('proff', proffesionals)

    this.workers = proffesionals;
    let currentDate = moment().locale('es').add(1, "day");
    try {
      for (let i = 0; i < 7; i++) {
        this.days[i] = {
          label: currentDate.format('ddd D'),
          value: currentDate.format('E'),
          date: moment(currentDate.format('YYYY-MM-D')),
        }
        currentDate.add(1, 'day');
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }

  }

  async selectProfessional(evnt) {
    this.selectedWorker = evnt.target.value;
    let req = await this.workerService.getFromWorker(evnt.target.value);

    let citas = await this.workerService.getPrice(evnt.target.value);

    console.log('citas', citas);

    citas.map((cit) => {
      this.citas.push({
        minutos: moment("00:00", "HH:mm").add(cit.minutes, 'minutes').format("HH:mm"),
        id: cit.id,
        tarifa: cit.tarifa,
        tipo: cit.descripcion
      })
    });
    this.selectCita = null;
    this.slide = 0;

    this.hours = [];
    req.map(async (hour, index) => {
      if (hour.hour_blocks) {
        hour.hour_blocks.map(hb => {
          this.hours.find((item, i) => item.start == hb.start) ? false : this.hours.push(hb);
        })
      }

      let indexDay = await this.days.findIndex(day => day.value == hour.day);

      if (indexDay != -1) {
        this.days[indexDay] = {
          ...this.days[indexDay],
          start_hour: hour.start_hour,
          finish_hour: hour.finish_hour
        };

      }
    });

    this.hours.sort((element, element2) => {
      if (element.start > element2.start) {
        return 1;
      }
      if (element.start < element2.start) {
        return -1;
      }
      return 0;
    });

  }

  getParsedHour(hour: string) {
    return moment(hour, 'HH:mm').locale('es').format('hh:mm A');
  }

  async selectHour(day, reservation_start, reservation_end) {

    this.sessionTime = this.selectCita.minutos;

    let dayMoment = this.days[day];

    let difference = moment(dayMoment.finish_hour, 'HH:mm:ss').diff(moment(reservation_start, 'HH:mm:ss'), 'm');

    let maxDuration = moment().startOf('day').minutes(difference).format('HH:mm');

    if (this.laserClinic && maxDuration < this.sessionTime) {
      this.alertService.alertError('El intérvalo de tiempo es insuficiente para la sesión')
      return;
    } else if (this.laserClinic) {
      let totalTime = moment(this.sessionTime, 'HH:mm')
      console.log(totalTime.hours(), totalTime.minutes());
      reservation_end = moment(reservation_start, 'HH:mm:ss')
        .add(totalTime.hours(), 'hours')
        .add(totalTime.minutes(), 'minutes')
        .format('HH:mm:ss');
    }

    let worker = await this.workers.find(element => element.id == this.selectedWorker);

    this.selectedHour = {
      day,
      reservation_start,
      reservation_end,
      dayMoment,
      worker,
      selectCita: this.selectCita
    };

  }

  continueEmit() {
    if (this.selectedHour.dayMoment) this.continue.emit(this.selectedHour);
    else this.alertService.alertError("seleccione una hora primero");
  }

}
