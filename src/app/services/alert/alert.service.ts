import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

const opts={
  showCloseButton:true,
  closeButtonText:"Cerrar",
  keyboardClose:true,
  duration:7000,
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastCtrl:ToastController
  ) { }

  async alertError(message:string){
    let toast=await this.toastCtrl.create({
      message:message,
      color:"danger",
      ...opts
    });
    toast.present();
  }

  async alertSuccess(message:string){
    let toast=await this.toastCtrl.create({
      message:message,
      color:"success",
      ...opts
      
    });
    toast.present();
  }

  async alertWarning(message:string){
    let toast=await this.toastCtrl.create({
      message:message,
      color:"warning",
      ...opts
    });
    toast.present();
  }

  async alertInfo(message:string){
    let toast=await this.toastCtrl.create({
      message:message,
      color:"secondary",
      ...opts
    });
    toast.present();
  }

}
