import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService : HttpService) { }

  registration(reqData : any){
    // console.log(reqData)
    let header = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        // 'Authorization':'token'
      })
    }
    return this.httpService.postService('User/Register', reqData, false, header);
  }

  login(reqData : any){
    // console.log(reqData)
    let header = {
      header:new HttpHeaders({
        'Content-type':'application/json',
        // 'Authorization':'token'
      })
    }
    return this.httpService.postService('User/Login', reqData, false, header);
  }

  forgotPassword(reqData : any){
    // console.log(reqData)
    let header = {
      header:new HttpHeaders({
        'Content-type':'application/json',
        // 'Authorization':'token'
      })
    }
    return this.httpService.postService('User/ForgotPassword', reqData, false, header);
  }

  resetPassword(reqData : any, token:any){
    //console.log(reqData)
    let headersOptions = {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'Authorization':`Bearer ${token}`
      })
    }
    return this.httpService.patchService('User/ResetPassword', reqData, true, headersOptions);
  }
}
