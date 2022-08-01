import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityEnum } from 'src/app/models/city.enum';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog'
import { OrderSuccessDialogComponent } from '../order-success-dialog/order-success-dialog.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  CityEnum = CityEnum
  user: UserModel
  order = new OrderModel()
  cartId: string

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  public maxDate: Object = new Date(this.currentYear, this.currentMonth + 1, this.currentDay)

  constructor(private ordersService: OrdersService, private router: Router, private notify: NotifyService, public dialog: MatDialog) { }

  // this prevents saturdays and sundays
  dateFilter(date: any) {
    const day = date?.getDay()
    return day !== 0 && day !== 6;
  }

  async ngOnInit() {
    this.user = store.getState().authState.user
  }

  async addOrder() {
    try {
      this.cartId = store.getState().cartsState.currentCart._id
      this.order.cartId = this.cartId
      this.order.userId = this.user._id

      await this.ordersService.addOrder(this.order)
      this.notify.success("Order has been added")

      let dialogRef = this.dialog.open(OrderSuccessDialogComponent)
      dialogRef.afterClosed().subscribe((result) => {
        if (result === undefined) {
          this.router.navigateByUrl('/shopping')
        }
      })
    } catch (err: any) {
      this.notify.error(err)
    }

  }

  doubleClickToPopulate() {
    this.order.shipCity = this.user.city
    this.order.shipStreet = this.user.street
  }

}
