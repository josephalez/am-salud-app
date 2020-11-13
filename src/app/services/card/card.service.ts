import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  getCards(): Promise<any> {

    return this.connectionService.getUrl('conekta/client/card').then((res: any) => {
      return res.data;
    });//.then((res: any) => {

  }
}
