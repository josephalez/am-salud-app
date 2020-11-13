import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  getProffessionalsByService(service: number): Promise<any> {
    return this.connectionService.getUrl("workers/" + service);
  }

  getFromWorker(worker: number): Promise<any> {
    return this.connectionService.getUrl('hours/' + worker);
  }

  getWorkers(page: number = 1): Promise<any> {
    return this.connectionService.getUrl('personal?per_page=6&page=' + page)
  }
  getPrice(id): Promise<any> {
    return this.connectionService.getUrl('workers/' + id + '/prices');
  }
}
