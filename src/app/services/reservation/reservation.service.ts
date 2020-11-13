import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { ReservationDto } from '../../schemas/reservation.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  storeReservation(params: ReservationDto, reservationId): Promise<any> {
    return this.connectionService.postUrl('reservations/' + reservationId, params);
  }

  myReservations(): Promise<any> {
    return this.connectionService.getUrl('reservations/mine');
  }

  cancel(id: any): Promise<any> {
    return this.connectionService.deleteUrl('reservations/' + id);
  }
  canceledReservation(id): Promise<any> {
    return this.connectionService.putUrl('clients/reservations/cancel/' + id);
  }
  confirmedReservation(id): Promise<any> {
    return this.connectionService.putUrl('clients/reservations/confirm/' + id);
  }
}
