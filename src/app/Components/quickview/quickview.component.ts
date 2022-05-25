import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/Services/BookService/book.service';
import { CartService } from 'src/app/Services/CartServices/cart.service';
import { FeedbackService } from 'src/app/Services/FeedbackServices/feedback.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  bookId:any;
  book:any;
  defaultImage= "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  ratingValue:any=0;
  comment:any;
  feedbackList:any=[];
  userId:any;
  myReview:any;

  constructor(private bookService : BookService,private feedbackService : FeedbackService, private cartService : CartService , 
    private activeRoute: ActivatedRoute, private _snackBar: MatSnackBar) { 
      this.userId = localStorage.getItem('userId');
    }

  ngOnInit(): void {
    this.bookId = this.activeRoute.snapshot.paramMap.get('bookId');
    this.quickView(this.bookId);
    this.getAllFeedback(this.bookId);
  }

  quickView(bookId:any){
    this.bookService.quickView(bookId).subscribe((response: any) => {
      console.log("QuickView of Book successful", response);
      this.book = response.data;
    });
  }
 
  addFeedback(){
    let reqData= {
      rating : this.ratingValue,
      comment : this.comment,
      bookId : this.book.bookId
    }
    this.feedbackService.addFeedback(reqData).subscribe((response: any) => {
      console.log("Feedback submitted successful", response);
      this.getAllFeedback(this.bookId);

      this._snackBar.open('Thank you for submitting your valuable feedback', '', {
        duration: 3000,
        verticalPosition: 'bottom'
    })
    });
  }

  getAllFeedback(bookId:any){
    this.feedbackService.getAllFeedback(bookId).subscribe((response: any) => {
      console.log("GetAll feedback successful", response);
      this.feedbackList = response.data;
    });
  }

  getShortName(fullName: any) {
    return fullName.split(' ').map((n: any) => n[0]).join('');
  }

  myFeedback(){
    this.displayFeedback(this.feedbackList);
    if(this.myReview?.length>0){
      this.ratingValue = this.myReview[0]?.rating;
      this.comment = this.myReview[0]?.comment;
    }
  }

  displayFeedback(list:any){
     if(list.length>0){ 
      this.myReview =  list.filter((object:any)=>{
        return object.userId == this.userId;
      })
    }
  }

  addToCart(){
    let booksQty = 1
    this.cartService.addToCart(this.book.bookId, booksQty).subscribe((response: any) => {
      console.log("Added to Cart successfully", response);

      this._snackBar.open('Added to Cart successfully', '', {
        duration: 3000,
        verticalPosition: 'bottom'
    })
    });
  }
  notifyMe(){}

  addToWishlist(){

  }
  
}
