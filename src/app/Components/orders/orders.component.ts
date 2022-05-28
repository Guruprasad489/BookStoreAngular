import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/OrderServices/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  defaultImage = "https://res.cloudinary.com/guruprasad489/image/upload/v1653326452/BookStore/default_book_cover_2015_fiqpmu.jpg";
  orderList:any;
  page: number = 1;

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((response: any) => {
      console.log("GetAll Orders successful", response);
      this.orderList = response.data;
      this.orderList = this.orderList.reverse();
    });
  }
}
