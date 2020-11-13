import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor (
    private connectionService: ConnectionService,
  ) { }

  getMisPedidos(): Promise<any> {
    return this.connectionService.getUrl('clients/pedidos').then((res: any) => {
      return res.data
    });
  }
}
