import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/Services/CartServices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  defaultImage= "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  step = 0;
  cartList:any;

  constructor(private cartService : CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllCart();
  }


  setStep(index: number) {
    this.step = index;
  }

  step0(){
    this.step=0;
  }
  step1() {
    this.step=1;
  }
  step2() {
    this.step=2;
  }

  getAllCart(){
    this.cartService.getAllCart().subscribe((response: any) => {
      console.log("GetAll Cart successful", response);
      this.cartList = response.data;
    });
  }

  decreaseQty(cartId:any, qty:any){
    if(qty>1){
      this.cartService.updateCrtQty(cartId, (qty-1)).subscribe((response: any) => {
        console.log("Decrease cart qty successful", response);
        this.getAllCart();
      });
    }
  }
  increaseQty(cartId:any, qty:any){
    if(qty<10){
      this.cartService.updateCrtQty(cartId, (qty+1)).subscribe((response: any) => {
        console.log("Increase cart qty successful", response);
        this.getAllCart();
      });
    }
  }

  removeFromCart(cartId:any){
    this.cartService.removeFromCart(cartId).subscribe((response: any) => {
      console.log("Item removed from cart successfully", response);

      if(this.cartList?.length>1){
        this.getAllCart();
      }
      else{
        window.location.reload();
      }
    });
  }
  
}
