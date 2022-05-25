import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  token :any;

  constructor(private httpService : HttpService) { 
    this.token = localStorage.getItem('token');
  }

  addToCart(bookId: any, qty:any) {
    //console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.postService(`Cart/Add?BookId=${bookId}&BooksQty=${qty}`, {}, true, header);
  }

  getAllCart(){
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.getService('Cart/GetAll', true, header);
  }

  updateCrtQty(cartId: any, qty:any) {
    //console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.patchService(`Cart/UpdateQty?cartId=${cartId}&bookQty=${qty}`, {}, true, header);
  }

  removeFromCart(cartId: any) {
    //console.log(reqData)
    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
    return this.httpService.deleteService(`Cart/Remove?cartId=${cartId}`, true, header);
  }
}
