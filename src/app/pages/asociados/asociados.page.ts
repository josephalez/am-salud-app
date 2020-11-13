import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { DetailedAsociadoComponent } from '../../components/detailed-asociado/detailed-asociado.component';

@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.page.html',
  styleUrls: ['./asociados.page.scss'],
})
export class AsociadosPage implements OnInit {

  users: any[] = [];

  constructor (
    private navCtrl: NavController,
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {

    await this.fetchAsociados()

  }

  async ionViewDidEnter() {
    await this.fetchAsociados();
  }

  async fetchAsociados() {
    try {

      let req = await this.userService.getAsociateUsers();
      this.users = req.data;

    } catch (error) {
    }
  }

  async detailed(index) {

    let asociado = this.users[index];

    let detailedModal = await this.modalCtrl.create({
      component: DetailedAsociadoComponent,
      cssClass: 'confirm-modal',
      componentProps: { asociado },
      showBackdrop: false,
    });

    detailedModal.present();

  }

  goAdd() {
    this.navCtrl.navigateForward('add-person');
  }

}
