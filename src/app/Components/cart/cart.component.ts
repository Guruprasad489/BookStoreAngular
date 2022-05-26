import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from 'src/app/Services/AddressServices/address.service';
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
  checkStock:boolean=false;
  fullName:any;
  mobileNumber:any;
  addressList:any;
  addressId:any;

  addressForm!: FormGroup;
  
  constructor(private cartService : CartService, private addressService : AddressService,private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { 
    this.fullName = localStorage.getItem('name');
    this.mobileNumber = localStorage.getItem('mobile');
  }

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
    this.checkStock = this.cartList.every((object:any)=>{
      return object.stock != 0;
    })
    if(this.checkStock == true){
      this.step=1;
      this.getAllAddress()
    }
    else{
      this._snackBar.open("Remove 'OUT OF STOCK' items from cart and then proceed", '', {
        duration: 5000,
        verticalPosition: 'bottom'
    })
    }
  }
  step2(addressId:any) {
    console.log("selected "+addressId)
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

  onSubmit(){

  }
  
  // AddAddress(){
  //   let reqData = {

  //   }
  //   this.addressService.addAddress(reqData).subscribe((response: any) => {
  //     console.log("Address Added successfully", response);

  //   });
  // }

  // updateAddress(addressId:any){
  //   let reqData = {

  //   }
  //   this.addressService.updateAddress(reqData, addressId).subscribe((response: any) => {
  //     console.log("Address updated successfully", response);

  //   });
  // }

  deleteAddress(addressId:any){
    this.addressService.deleteAddress(addressId).subscribe((response: any) => {
      console.log("Item removed from cart successfully", response);

      if(this.cartList?.length>1){
        this.getAllCart();
      }
      else{
        window.location.reload();
      }
    });
  }

  getAddressById(typeId: any, addressId:any){
    this.addressService.getAddressById(typeId, addressId).subscribe((response: any) => {
    console.log("Get Address successful", response);
    //this.address = response.data;
    });
  }

  getAllAddress(){
    this.addressService.getAllAddresses().subscribe((response: any) => {
    console.log("Getall Address successful", response);
    this.addressList = response.data;
    });
  }

}
