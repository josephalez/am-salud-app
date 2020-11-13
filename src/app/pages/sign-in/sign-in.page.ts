import {
  NavController,
  MenuController
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  CONSTANTES
} from '../../constants/constants';

import {
  AuthService
} from '../../services/auth/auth.service';
import {
  AlertService
} from '../../services/alert/alert.service';

import { FcmService } from 'src/app/services/fcm/fcm.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss', "../../styles/auth-page.scss"],
})
export class SignInPage implements OnInit {

  loginForm: FormGroup;

  constructor (
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private fcm: FcmService
  ) {
    this.menuCtrl.enable(false, "amsMenu");
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() { }

  async login() {
    if (this.loginForm.invalid) {
      await this.alertService.alertError("Rellene todos los campos");
      return;
    }

    try {
      let req = await this.authService.login(this.loginForm.value);
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.usuario, JSON.stringify(req.user));
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.token, req.token);
      localStorage.setItem(CONSTANTES.LOCAL_STORAGE.primeraVez, JSON.stringify(req.user.reservations.length == 0));
      localStorage.setItem('isAuthenticated', "true");
      //this.fcm.subscribeTopi(req.user.topic_firebase); 
      this.navCtrl.navigateBack('/home');
    } catch (err) {
      if (err.status == 422) {
        for (let errorIndex in err.error.error) {
          if (Array.isArray(err.error.error[errorIndex])) {
            err.error.error[errorIndex].map(errorMessage => this.alertService.alertError(errorMessage));
          }
          else if (typeof err.error.error[errorIndex] == 'string') {
            this.alertService.alertError(err.error.error[errorIndex]);
          }
        }
      }
      else this.alertService.alertError(err.error.message);
    }
  }
  forgotPassword() {
    //this.navCtrl.navigateForward('/forgot-password');
  }
  signUp() {
    this.navCtrl.navigateBack('/sign-up');
  }
}