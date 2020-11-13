import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { CONSTANTES } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private connectionService: ConnectionService
  ) { }

  getDescuento(id): Promise<any> {
    return this.connectionService.getUrl('clients/descuentos/' + id).then((res: any) => res.data);
  }

  updateUser(userUpdateParams: FormData): Promise<any> {
    return this.connectionService.postUrl('users/edit', userUpdateParams);
  }

  getAsociateUsers(): Promise<any> {
    return this.connectionService.getUrl('asociados');
  }

  getPrimeraVez(): Promise<any> {
    return this.connectionService.getUrl('primeravez').catch((err) => {
    });
  }

  associate(data: any): Promise<any> {
    return this.connectionService.postUrl('asociados', data);
  }

  edad(FechaNacimiento) {
    const fechaNace = new Date(FechaNacimiento);
    const fechaActual = new Date()

    const mes = fechaActual.getMonth();
    const dia = fechaActual.getDate();
    const año = fechaActual.getFullYear();

    fechaActual.setDate(dia);
    fechaActual.setMonth(mes);
    fechaActual.setFullYear(año);


    const edad = Math.floor(((fechaActual.getTime() - fechaNace.getTime()) / (1000 * 60 * 60 * 24) / 365));
    return edad >= 18;
  }

  async associatedLabels(): Promise<any> {

    let users = await this.getAsociateUsers();



    let list = await users.data.map((user) => {
      return {
        name: user.name,
        type: 'radio',
        label: user.name,
        value: user.id,
        maryor: this.edad(user.birthday),
        primera: (user.reservations.length == 0)
      }
    });

    if (!list.length) return [];

    let d = JSON.parse(localStorage.getItem(CONSTANTES.LOCAL_STORAGE.primeraVez));

    return [...list, {
      name: "Mi usuario",
      type: "radio",
      label: "Para mi usuario",
      value: null,
      primera: d
    }]

  }

}
