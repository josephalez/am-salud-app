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
  AuthService
} from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CONSTANTES } from '../../constants/constants';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss', "../../styles/auth-page.scss"]
})
export class SignUpPage implements OnInit {

  signupGroup: FormGroup;

  terms: boolean = false;
  subscription: boolean = false;

  constructor (
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.menuCtrl.enable(true, "amsMenu")
    this.signupGroup = this.formBuilder.group({
      username: [''],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    })
  }

  ngOnInit() { }

  async register() {

    if (this.signupGroup.invalid) {
      this.alertService.alertError(CONSTANTES.MESSAGES.campos);
      return;
    }

    if (this.signupGroup.value.password !== this.signupGroup.value.password_confirmation) {
      this.alertService.alertError(CONSTANTES.MESSAGES.claves_match);
      return;
    }

    try {

      let req = await this.authService.register(this.signupGroup.value);

      this.alertService.alertSuccess("Usuario registrado exitosamente");
      localStorage.setItem("token", req.token);
      localStorage.setItem("user", JSON.stringify(req.user));
      localStorage.setItem("isAuthenticated", "true");

      this.navCtrl.navigateForward('/home');

    } catch (err) {
      if (err.status == 422) {
        for (let errorIndex in err.error) {
          if (Array.isArray(err.error[errorIndex])) {
            err.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage))
          }
          else if (typeof err.error[errorIndex] == 'string') this.alertService.alertError(err.error[errorIndex]);
        }
      } else this.alertService.alertError(CONSTANTES.MESSAGES.error);
    }

  }

  signIn() {
    this.navCtrl.navigateBack('/sign-in');
  }
}