import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/BookService/book.service';
import { DataService } from 'src/app/Services/DataService/data.service';

@Component({
  selector: 'app-getallbooks',
  templateUrl: './getallbooks.component.html',
  styleUrls: ['./getallbooks.component.scss']
})
export class GetallbooksComponent implements OnInit {
  bookList: any;
  defaultImage= "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  sortBy:any="Sort by relevence";
  searchString:any;

  // @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private bookService : BookService, private router:Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.recievedData.subscribe((response: any) => {
      //console.log("Data recieved", response);
      this.searchString = response
    })
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((response: any) => {
      console.log("GetAll Books successful", response.data);
      this.bookList = response.data;
      // this.bookList.reverse();
    });
  }

  relevence(){  
    this.bookList = this.bookList.sort((x: any, y: any) => x.bookId - y.bookId);
    this.sortBy="Sort by relevence";

  }

  PriceLowToHigh(){
    this.bookList = this.bookList.sort((x: any, y: any) => x.discountPrice - y.discountPrice);
    this.sortBy="Price -- Low to High";
  }

  PriceHighToLow(){ 
    this.bookList = this.bookList.sort((x: any, y: any) => y.discountPrice - x.discountPrice);
    this.sortBy="Price -- High to low";
  }

  newestFirst(){
     this.bookList = this.bookList.sort((x: any, y: any) => y.bookId - x.bookId);
     this.sortBy="newest First";
  }

  quickView(bookId:any){
    this.router.navigateByUrl('/home/quickview/' + bookId);
  }
}
