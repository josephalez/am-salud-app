import { Injectable } from '@angular/core';
import { getRandomString } from 'selenium-webdriver/safari';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  convertFileFromuri(str:string){
    // extract content type and base64 payload from original string
    let pos = str.indexOf(';base64,');
    let type = str.substring(5, pos);
    let b64 = str.substr(pos + 8);
      
    // decode base64
    let imageContent = atob(b64);
      
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    let buffer = new ArrayBuffer(imageContent.length);
    let view = new Uint8Array(buffer);
      
    // fill the view, using the decoded base64
    for(let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    
    // convert ArrayBuffer to Blob
    let blob = new Blob([buffer], { type: type });
    
    let file= new File([blob], "file" ,{type:type});
    
    return file;
  }

}
