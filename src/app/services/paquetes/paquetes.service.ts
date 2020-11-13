import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  getPaquetes(creditId: number): Promise<any> {

    return this.connectionService.getUrl('paquetes?data_array=' + creditId).then((res) => {

      return res;
    });
  }

  getComprarPaquete(idCard, data): Promise<any> {
    return this.connectionService.postUrl('checkoutpaquete', data).then((res) => {

      return res;
    }).catch((e) => {
    });
  }
}
