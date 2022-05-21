import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  postService(url: string, reqData: any, token: boolean = false, httpOptions: any = {}) {
    return this.httpClient.post(this.baseurl + url, reqData, token && httpOptions);
  }

  getService(url : string='',  tokenRequired: boolean = false, httpOptions: any = {} ){
    return this.httpClient.get(this.baseurl + url, tokenRequired && httpOptions);
  }

  putService(url : string='', reqData: any,  tokenRequired: boolean = false, httpOptions: any = {} ){ 
    return this.httpClient.put(this.baseurl + url, reqData, tokenRequired && httpOptions);
   }

  deleteService(url : string='',  tokenRequired: boolean = false, httpOptions: any = {} ){
    return this.httpClient.delete(this.baseurl + url, tokenRequired && httpOptions);
  }

  patchService(url : string='',reqData: any,  tokenRequired: boolean = false, httpOptions: any = {} ){ 
    return this.httpClient.patch(this.baseurl + url, reqData, tokenRequired && httpOptions);
   }
}
