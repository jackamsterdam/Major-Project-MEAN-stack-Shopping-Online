import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import {MatDialog} from '@angular/material/dialog'
import { OrderSuccessDialogComponent } from '../order-success-dialog/order-success-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  CityEnum = CityEnum
  // user = new UserModel()
  user: UserModel

  order =  new OrderModel()

  //for date: 
  // minDate = new Date()
  // maxDate = new Date(2019, 3, 10)
  // maxDate = this.minDate + 1 doesnt work

  // max date one month from now(deliveries can be set only one month in advance)
public today: Date = new Date();
public currentYear: number = this.today.getFullYear();
public currentMonth: number = this.today.getMonth();
public currentDay: number = this.today.getDate();
public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

public maxDate: Object =  new Date(this.currentYear, this.currentMonth+1, this.currentDay)


  constructor(private ordersService: OrdersService, private router: Router, private notify: NotifyService, public dialog: MatDialog) { }

//!how to grab eleemnts from html like dovument.getlelement by isnt htis the way???? then why doesnt it work i want to set a value with couble click to opoulate !!! 
  // @ViewChild("streetBox")
  // public streetBoxRef: ElementRef<HTMLInputElement>;

  


//!*********************************************************************
// i need all orders as well !! to see if no three on same date! right?
allOrders: OrderModel[]
// this prevents saturdays and sundays but we want to prevent days with more than 3 ! 
dateFilter(date: any) {  //any????
  console.log("date", date);
  console.log('typeof', typeof date)
  const day = date?.getDay()
  return day !== 0 && day !== 6;  //change to saturday only 
}
  async ngOnInit() {
    // try catch 
    this.user = store.getState().authState.user
    // this.user.city = ''

    // optional: get all dates to see which shipping dates you cannot choose: 
    this.allOrders = await this.ordersService.getAllOrders()
    console.log("this.allOrders", this.allOrders);

    //! how to loop over all ship dates?????? to see if התנגשויות
  }

  async addOrder() {
    try {
      // console.log("this.ssnBoxRef.nativeElement", this.streetBoxRef.nativeElement.value);//! why doesnt it have a vlue property???????????
      console.log('this.order', this.order)
      const addedOrder = await this.ordersService.addOrder(this.order)
      this.notify.success("Order has been added")
      // this.router.navigateByUrl('/order-success')//!change this!!! do i want popup or componnet???i want popup:
      
      this.dialog.open(OrderSuccessDialogComponent)
    } catch (err: any) {
      this.notify.error(err)
    }

  }

  doubleClickToPopulate() {
    console.log('hi')
    //!Problem!!!! fields get populated right away!!  I dont want to populate it right away with fromsmodule i want to double click and populate !! maybe only works with reactive forms 
    //! btw i put both order and both user and that made the form not poulate right away! can i do that ??
  }




}
