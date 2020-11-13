import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServService } from '../../services/services/serv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showRoutes:boolean=false;

  services:any[]=[];

  constructor(
    private NavCtrl:NavController,
    private menuCtrl:MenuController,
    private servService:ServService
  ) {
    this.menuCtrl.enable(true, "amsMenu");    
  }

  async ngOnInit() {
    await this.fetchServices();
  }

  async fetchServices(){
    let req= await this.servService.getServices();
    this.services=req;
  }

  showOptions(){
    this.showRoutes=!this.showRoutes;
  }

  goProfile(){
    this.NavCtrl.navigateForward("/perfil");
  }

  goLaserClinic(){
    this.NavCtrl.navigateForward("/laser-clinic",{queryParams:{service:2}}); 
  }

  filteredServices(){
    return this.services.filter(el=>el.id!=2);
  }


}
