import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token :any;

  constructor(private httpService : HttpService) { 
    this.token = localStorage.getItem('token');
  }

  addWishlist(id: any) {
    // console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService('WishList/Add?bookId=' + id, {}, true, header);
  }

  RemoveWishlist(id: any) {
    //console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService('WishList/Remove?wishListId=' + id, true, header);
  }

  getAllWishlist() {
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('WishList/GetAll', true, header);
  }

}
