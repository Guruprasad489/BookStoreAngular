import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from 'src/app/Services/WishlistServices/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  defaultImage = "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  wishList:any;

  constructor(private wishlistService : WishlistService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWishlist()
  }

  getWishlist() {
    this.wishlistService.getAllWishlist().subscribe((response: any) => {
      console.log("GetAll Wishlist successful", response);
      this.wishList = response.data;
    });
  }

  removeFromWishlist(wishlistId:any) {
    this.wishlistService.RemoveWishlist(wishlistId).subscribe((response: any) => {
      console.log("Item removed from Wishlist successfully", response);
      if (this.wishList?.length > 1) {
        this.getWishlist();
      }
      else {
        this.wishList = [];
      }
      this._snackBar.open('Item removed from Wishlist', '', {
        duration: 3000,
        verticalPosition: 'bottom',
    })
    });
  }

}
