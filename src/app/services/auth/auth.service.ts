import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { LoginDto } from '../../schemas/login.dto';
import { RegisterDto } from '../../schemas/register.dto';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private connectionService: ConnectionService,
    private navCtrl: NavController,
  ) { }

  register(params: RegisterDto): Promise<any> {
    return this.connectionService.postUrl("users", params);
  }

  login(params: LoginDto): Promise<any> {
    return this.connectionService.postUrl('users/login', params);
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();
    this.navCtrl.navigateBack('/sign-in');
  }

  verifyToken(): Promise<any> {
    return this.connectionService.getUrl('users/me');
  }

}
