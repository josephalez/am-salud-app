import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  countProduct = new BehaviorSubject<number>(0);

  constructor (
    private connectionService: ConnectionService
  ) { }

  getCart(): Promise<any> {

    return this.connectionService.getUrl('cars').then((res: any) => {

      this.countProduct.next(res.data.length);
      return res.data;
    });

  }
  insertar(data): Promise<any> {
    return this.connectionService.postUrl('cars', data).then((res: any) => {
      this.countProduct.next(res.data.length);
      return res.data;
    });
  }
  checkout(data): Promise<any> {

    return this.connectionService.postUrl('checkout', data).then((res: any) => {
      this.countProduct.next(res.data.length);
      return res.data;
    });
  }
}
