import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = 'https://nre.appsmalaya.com/warehouse/api';
  barcodeText: string = null;
  constructor(private httpClient: HttpClient) { }

  httpGet(path: string){
    let fullUrl: string = this.baseURL + path;

    return new Promise((resolve, reject) => { 
      this.httpClient.get(fullUrl)
      .subscribe((response: any) => { 
        resolve(response);
      }, (err: any) => {
        reject(err);
      });
    })

  }

  httpPost(path: string, body: any){
    let fullUrl: string = this.baseURL + path;
    return new Promise((resolve, reject) => { 
      this.httpClient.post(fullUrl, body)
      .subscribe((response: any) => { 
        resolve(response);
      }, (err: any) => {
        reject(err);
      });
    })
  }
}
