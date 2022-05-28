import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/Services/AddressServices/address.service';
import { CartService } from 'src/app/Services/CartServices/cart.service';
import { OrderService } from 'src/app/Services/OrderServices/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  defaultImage = "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  step = 0;
  cartList: any;
  checkStock: boolean = false;
  fullName: any;
  mobileNumber: any;
  addressList: any;
  addressId = 0;
  addressObj:any;
  isAddEditAddress:boolean=false;
  continue:boolean=false;

  address:any;
  city:any;
  state:any;
  addressType:any


  constructor(private cartService: CartService, private addressService: AddressService, private orderService: OrderService,
    private _snackBar: MatSnackBar, private router: Router) {
    this.fullName = localStorage.getItem('name');
    this.mobileNumber = localStorage.getItem('mobile');
  }

  ngOnInit(): void {
    this.getAllCart();
  }


  setStep(index: number) {
    this.step = index;
  }

  step0() {
    this.step = 0;
  }
  step1() {
    this.continue = false;
    if (this.cartList?.length > 0) {
      this.checkStock = this.cartList.every((object: any) => {
        return object.stock != 0;
      })
      if (this.checkStock == true) {
        this.step = 1;
        this.getAllAddress()
      }
      else {
        this._snackBar.open("Remove 'OUT OF STOCK' items from cart and then proceed", '', {
          duration: 5000,
          verticalPosition: 'bottom'
        })
      }
    }
  }
  step2(addressId: any) {
    //console.log("selected address :" + addressId)
    if (this.cartList?.length > 0) {
      this.step = 2;
      this.continue = true;
    }
    else{
      this.step = 0;
    }
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe((response: any) => {
      console.log("GetAll Cart successful", response);
      this.cartList = response.data;
    });
  }

  decreaseQty(cartId: any, qty: any) {
    if (qty > 1) {
      this.cartService.updateCrtQty(cartId, (qty - 1)).subscribe((response: any) => {
        console.log("Decrease cart qty successful", response);
        this.getAllCart();
      });
    }
  }
  increaseQty(cartId: any, qty: any) {
    // if (qty < 10) {
      this.cartService.updateCrtQty(cartId, (qty + 1)).subscribe((response: any) => {
        console.log("Increase cart qty successful", response);
        this.getAllCart();
      });
    // }
  }

  removeFromCart(cartId: any) {
    this.cartService.removeFromCart(cartId).subscribe((response: any) => {
      console.log("Item removed from cart successfully", response);

      if (this.cartList?.length > 1) {
        this.getAllCart();
      }
      else {
        this.cartList = [];
      }
    });
  }

  getAllAddress() {
    this.addressService.getAllAddresses().subscribe((response: any) => {
      console.log("Getall Address successful", response);
      this.addressList = response.data;
      if (this.addressList?.length > 0) {
        this.addressId = this.addressList[0].addressId;
      }
    });
  }

  editAddress(id: any) {
    // console.log(id, this.address=[])
    this.isAddEditAddress = true;
    this.addressObj = this.addressList.filter((object:any)=>{
      return object.addressId == id;
    })
    this.addressObj = this.addressObj[0];
    this.address = this.addressObj.address;
    this.city = this.addressObj.city;
    this.state = this.addressObj.state;
    this.addressType = this.addressObj.typeId;
  }

  addNewAddress(){
    this.isAddEditAddress = true;
    this.addressObj = [];
    this.address='';
    this.city='';
    this.state='';
    this.addressType='';
  }

  cancel(){
    this.isAddEditAddress = false;
  }

  // getAddressById(addressId: any) {
  //   this.addressService.getAddressById(addressId).subscribe((response: any) => {
  //     console.log("Get Address successful", response);
  //     //this.address = response.data;
  //   });
  // }

  // onSubmit() {

  // }

  addAddress(){
    if(this.address && this.city && this.state && this.addressType != ''){
      let reqData = {
        address: this.address,
        city: this.city,
        state: this.state,
        typeId: Number(this.addressType)
      }
      this.addressService.addAddress(reqData).subscribe((response: any) => {
        console.log("New Address Added successfully", response);
        this.getAllAddress();

        this._snackBar.open("New Address Added successfully", '', {
          duration: 5000,
          verticalPosition: 'bottom'
        })
        this.isAddEditAddress = false;
      });
    }
    else{
      this._snackBar.open("Address fields should not be empty", '', {
        duration: 5000,
        verticalPosition: 'bottom'
      })
    }
  }

  updateAddress(addressId:any){
    if(this.address && this.city && this.state && this.addressType && addressId != ''){
      let reqData = {
        address: this.address,
        city: this.city,
        state: this.state,
        typeId: Number(this.addressType),
        addressId: addressId
      }
      console.log(reqData)
      this.addressService.updateAddress(reqData).subscribe((response: any) => {
        console.log("Address updated successfully", response);
        this.getAllAddress();

        this._snackBar.open("Address updated successfully", '', {
          duration: 5000,
          verticalPosition: 'bottom'
        })
        this.isAddEditAddress = false;
      });
    }
    else{
      this._snackBar.open("Address fields should not be empty", '', {
        duration: 5000,
        verticalPosition: 'bottom'
      })
    }
  }

  // deleteAddress(addressId:any){
  //   this.addressService.deleteAddress(addressId).subscribe((response: any) => {
  //     console.log("Item removed from cart successfully", response);

  //     if(this.cartList?.length>1){
  //       this.getAllCart();
  //     }
  //     else{
  //       window.location.reload();
  //     }
  //   });
  // }

  addOrder() {
    if (this.cartList?.length > 0) {
      this.orderService.addOrder(this.addressId).subscribe((response: any) => {
        console.log("Order placed successfully", response);
        this.router.navigateByUrl('/home/order-success');

        this._snackBar.open('Order Placed successfully', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          panelClass: ['snackbar-green']
        })
      })
    }
    else{
      this.step = 0;
      this._snackBar.open('No items to order', '', {
        duration: 3000,
        verticalPosition: 'bottom',
      })
    }
  }

}
