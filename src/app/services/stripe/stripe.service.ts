import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { CardStoreDto } from '../../schemas/card-store.dto';
import { PaymentDataDto } from '../../schemas/payment-data.dto';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AppSettings } from 'src/app/app.settings';

declare var Conekta: any;

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  laserToken = new Subject();
  nutriToken = new Subject();
  errorCard = new Subject();
  successTokenNutri = (token) => {
    this.nutriToken.next(token.id);
  };

  successTokenLaser = (token) => {
    this.laserToken.next(token.id);
  };
  errorHandler = (err) => {
    this.errorCard.next(err.message_to_purchaser);

  }
  constructor (
    private connectionService: ConnectionService
  ) { }
  createTokenCard(data) {
    this.createTokenLaser(data);
    this.createTokenNutri(data);

  }
  createTokenNutri(data) {
    Conekta.setPublicKey(AppSettings.keyConektaNutri);
    data.number = (data.number + '').replace(/\D/g, '');
    Conekta.Token.create(data, this.successTokenNutri, this.errorHandler);
  }
  createTokenLaser(data) {
    Conekta.setPublicKey(AppSettings.keyConektaLaser);
    data.number = (data.number + '').replace(/\D/g, '');
    Conekta.Token.create(data, this.successTokenLaser, this.errorHandler);
  }
  /*   getStripeClient(): Promise<any> {
      return this.connectionService.getUrl('clients/stripes');
    } */
  /*   registerStripeClient(): Promise<any> {
      return this.connectionService.postUrl('clients/stripes');
    } */
  registerStripeCard(cardData: CardStoreDto): Promise<any> {
    return this.connectionService.postUrl('conekta/client/card', cardData);
  }
  makePayment(paymentData: PaymentDataDto): Promise<any> {
    return this.connectionService.postUrl('clients/balances', paymentData);
  }
  getstripeCards(): Promise<any> {
    return this.connectionService.getUrl('conekta/client/card');
  }

}
