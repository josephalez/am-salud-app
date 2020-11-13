import {
  NavController,
  MenuController,
  ModalController
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  AlertService
} from '../../services/alert/alert.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CONSTANTES } from '../../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.page.html',
  styleUrls: ['./add-person.page.scss', "../../styles/auth-page.scss"],
})
export class AddPersonPage implements OnInit {

  signupGroup: FormGroup;

  constructor (
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.menuCtrl.enable(true, "amsMenu")
    this.signupGroup = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      genero: [null, Validators.required],
    })
  }

  ngOnInit() { }

  async register() {

    if (this.signupGroup.invalid) {
      this.alertService.alertError(CONSTANTES.MESSAGES.campos);
      return;
    }

    //Esto no va un usuario asociado no necesita pass
    /*  if(this.signupGroup.value.password!==this.signupGroup.value.password_confirmation){
       this.alertService.alertError(CONSTANTES.MESSAGES.claves_match);
       return;
     } */

    try {

      let req = await this.userService.associate(this.signupGroup.value);
      this.alertService.alertSuccess("Usuario asociado exitosamente");

      this.navCtrl.navigateBack('asociados');

    } catch (err) {
      if (err.status == 422) {
        for (let errorIndex in err.error) {
          err.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage))
        }
      } else this.alertService.alertError(CONSTANTES.MESSAGES.error);
    }

  }
}