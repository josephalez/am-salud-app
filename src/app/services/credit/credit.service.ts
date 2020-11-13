import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  getSaldo(): Promise<any> {
    return this.connectionService.getUrl('paquetes/saldo').then((res: any) => {
      return res.data;
    });
  }

  getCreditTypes(): Promise<any> {

    return this.connectionService.getUrl('credito');//.then((res: any) => {
    //return res.data;
    //});

    return new Promise((resolve) => {
      resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: "AM CASH"
          },
          {
            id: 2,
            name: "LC CASH"
          }
        ]
      })
    })
  }

}
