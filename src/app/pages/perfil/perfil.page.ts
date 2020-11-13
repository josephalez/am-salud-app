import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  IonSlides, ActionSheetController, ModalController
} from '@ionic/angular';
import {
  AppSettings
} from '../../app.settings';
import {
  AuthService
} from '../../services/auth/auth.service';
import {
  AlertService
} from '../../services/alert/alert.service';
import {
  UserService
} from '../../services/user/user.service';
import {
  SafeResourceUrl
} from '@angular/platform-browser';
import {
  ReservationService
} from '../../services/reservation/reservation.service';
import { CONSTANTES } from '../../constants/constants';
import { StripeService } from '../../services/stripe/stripe.service';
import { StripeCardFormComponent } from '../../components/stripe-card-form/stripe-card-form.component';
import { CreditService } from '../../services/credit/credit.service';
import { CardService } from 'src/app/services/card/card.service';
import { PedidoComponent } from 'src/app/components/pedido/pedido.component';
//import { CameraOriginal } from '@ionic-native/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: [
    './perfil.page.scss',
    "../../styles/payments-style.scss",
  ],
})
export class PerfilPage implements OnInit {

  @ViewChild("ProfileSlides") profileSlides: IonSlides;

  selctedLabel: string = 'reservas';

  editionMode: boolean = false;

  name: string = '';
  last_name: string = '';
  phone: string = '';
  email: string = '';
  gender: string = '';
  profile_picture: string = null;
  preview: SafeResourceUrl = "";
  saldos = [];
  saldo = 0;

  reservations: any[] = [];

  selectedImg: any = null;

  credits: any[] = [];

  cards: any[] = [];

  selectedCredit: any = null;

  constructor (
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private reservationService: ReservationService,
    private stripeService: StripeService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private creditService: CreditService,
    private cardservice: CardService,
    //private camera:CameraOriginal
  ) { }


  async ngOnInit() {
    await this.fetchCreditTypes();
    await this.fetchMyData();
    await this.fetchReservations();
    this.getCardCredits();
  }

  getCardCredits() {
    this.cardservice.getCards().then((data) => {
      console.log(data);
      this.cards = data;
    })
  }

  async ionViewDidEnter() {
    await this.fetchCreditTypes();
    await this.fetchMyData();
    await this.fetchReservations();
  }

  async fetchCreditTypes() {
    try {

      let req = await this.creditService.getCreditTypes();

      console.log("credit types", req);

      this.credits = req.data;
      this.saldos = await this.creditService.getSaldo();
      console.log('esto es el saldo');
      console.log(this.saldos);

    } catch (error) {
      console.log(error);
      this.alertService.alertError(CONSTANTES.MESSAGES.error)
    }
  }

  async switchCredit() {
    let actionSheet = await this.actionSheetCtrl.create({
      header: "Seleccione un tipo de crédito",
      buttons: await this.credits.map(credit => {
        return {
          text: credit.name,
          handler: () => {
            this.selectCredit(credit)
          }
        };
      })
    });

    await actionSheet.present();
  }

  selectCredit(credit) {
    console.log(credit);
    let sal = this.saldos.find((ele, index, ar) => {
      return ele.credit_id == credit.id
    });
    console.log(sal);
    if (typeof sal !== "undefined" && typeof sal.saldo !== "undefined") {
      this.saldo = sal.saldo;
    } else {
      this.saldo = 0;
    }
    this.selectedCredit = credit;
  }

  async addCard() {

    let modal = await this.modalCtrl.create({
      component: StripeCardFormComponent,
      mode: "ios",
    });

    await modal.present();

    modal.onDidDismiss().then((data: any) => {
      console.log("modal dismissed")
      console.log(data);
      if (data.data.recargar) {
        this.getCardCredits();
      }

    })

  }
  async pedidos() {

    let modal = await this.modalCtrl.create({
      component: PedidoComponent,
      mode: "ios",
    });

    await modal.present();

  }

  swipeLabel(label) {
    /*     switch (label) {
          case 'reservas':
            this.profileSlides.slideTo(0);
            break;
    
          case 'datos':
            this.profileSlides.slideTo(1);
            break;
    
          case 'pagos':
            this.profileSlides.slideTo(2);
            break;
    
          default:
            break;
        } */
    this.selctedLabel = label;
  }

  editProfile() {
    this.editionMode = true;
  }

  quitEdition() {
    this.editionMode = false;
  }

  async fetchMyData() {
    try {

      let req = await this.authService.verifyToken();
      console.log('data', req.user);
      this.name = req.user.name;
      this.last_name = req.user.last_name;
      this.phone = req.user.phone;
      this.email = req.user.email;
      this.gender = req.user.gender;
      this.profile_picture = req.user.profile_picture;

      //let cards = await this.stripeService.getStripeClient();

      //console.log('cards info', cards)

    } catch (err) {
      console.log(err)
      this.alertService.alertError("Error al obtener los datos de usuario");
    }
  }

  async fetchReservations() {
    try {

      let req = await this.reservationService.myReservations();

      console.log("req", req)

      this.reservations = req;

    } catch (err) {
      console.log(err)
      if (!(err.status === 404)) this.alertService.alertError("Error al obtener las reservas recientes");
    }
  }

  getImage() {
    if (this.profile_picture) {
      return AppSettings.apiUrl + '/' + this.profile_picture;
    } else if (this.preview) {
      return this.preview;
    } else return 'assets/images/default/user.png';
  }

  getParsedGender(gender) {
    switch (gender) {
      case 'male':
        return 'Hombre'
        break;

      case 'female':
        return 'Mujer'
        break;

      default:
        return 'Indefinido'
        break;
    }
  }

  async submitUpload() {
    let {
      name,
      last_name,
      gender,
      phone
    } = this;

    /*  if (name == '' || last_name == '' || gender == '' || phone == '') {
       this.alertService.alertError(CONSTANTES.MESSAGES.campos);
       return;
     } */

    try {
      let updateUserFormData = new FormData;
      updateUserFormData.append('_method', 'put');
      updateUserFormData.append("name", name);
      updateUserFormData.append("last_name", last_name);
      updateUserFormData.append("gender", gender);
      updateUserFormData.append("phone", phone);

      if (this.selectedImg) updateUserFormData.append("profile_picture", this.selectedImg);

      let req = await this.userService.updateUser(updateUserFormData);
      console.log(req);

      this.quitEdition();

      this.alertService.alertSuccess(req.message);
    } catch (err) {
      console.log(err);
      /*   if (err.status == 422) {
          for (let errorIndex in err.error) {
            err.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage))
          }
        } else {
          //this.alertService.alertError(CONSTANTES.MESSAGES.error);
        } */
      this.alertService.alertError(CONSTANTES.MESSAGES.error);
    }

  }

  AccessGallery(fromGallery = false) {

    /*
    this.camera.getPicture({
   
       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
   
       destinationType: this.camera.DestinationType.DATA_URL,
   
      }).then((imageData) => {
   
        let imgUrl = 'data:image/jpeg;base64,'+imageData;
        
        console.log(imgUrl);
 
      }, (err) => {
   
        console.log(err);
   
      });
      */

  }

}