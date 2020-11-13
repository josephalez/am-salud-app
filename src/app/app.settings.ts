import { CONSTANTES } from './constants/constants';

export class AppSettings {
  //public static apiUrl= "http://localhost:8000"; //laravel local enviroment
  public static apiUrl = "https://phpstack-368430-1214164.cloudwaysapps.com";
  // public static apiUrl = 'https://apisalud.test';
  //public static apiUrl = 'https://ff93606f6963.ngrok.io';
  public static token = 'Bearer ' + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token);
  public static Plaintoken = localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token);

  public static keyConektaLaser = 'key_BwFDsyYsWXwJfRU4cWdgqUg';
  public static keyConektaNutri = 'key_BWxxLpDUDJMuXYJqrWqjYPA';

  public static async getToken() {
    return 'Bearer ' + await localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
  }
}