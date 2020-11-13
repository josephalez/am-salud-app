import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailedMemberComponent } from '../../components/detailed-member/detailed-member.component';
import { WorkerService } from '../../services/worker/worker.service';
import { AlertService } from '../../services/alert/alert.service';
import { CONSTANTES } from '../../constants/constants';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  members: any[] = [];

  currentPage: number = 1;

  lastPage: number = 1;

  constructor (
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private workerService: WorkerService,
  ) { }

  async ngOnInit() {
    await this.fetchWorkers()
  }

  async fetchWorkers(page: number = this.currentPage) {

    try {
      let req = await this.workerService.getWorkers(page).catch(err => { });
      this.members = req.data;
      this.lastPage = req.last_page;
      this.currentPage = req.current_page;
    } catch (error) {

      this.alertService.alertError(CONSTANTES.MESSAGES.error);

    }

  }

  getImage(index: number) {
    let member = this.members[index];
    return member.profile_picture ? member.profile_picture : '/assets/images/default/user.png';
  }

  async openMember(index: number) {

    let member = this.members[index];

    let modal = await this.modalCtrl.create({
      component: DetailedMemberComponent,
      componentProps: {
        member
      },
      mode: "ios",
    });

    await modal.present();

  }

}
