import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private menuCtrl:MenuController,
    private navCtrl:NavController,
    private authService:AuthService,
  ) { }

  ngOnInit() {}

  closeMenu(){
    this.menuCtrl.close("amsMenu");
  }

  logout(){
    this.authService.logout();
    this.closeMenu()
  }

  goPage(route:string){
    this.navCtrl.navigateBack(route);
    this.closeMenu()
  }

}
