import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class ServService {

  constructor(
    private connectionService:ConnectionService
  ) { }

  getServices():Promise<any>{
    return this.connectionService.getUrl('services');
  }

}
