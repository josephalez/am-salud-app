import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class LaserZoneService {

  constructor(
    private connectionService:ConnectionService
  ) { }

  getZones(page:number=1):Promise<any>{
    return this.connectionService.getUrl('zonas?per_page=15&page='+page);
  } 

}
 