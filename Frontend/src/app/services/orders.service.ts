import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { addOrderAction, fetchOrdersAction } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  //For login page to dislay number of orders:
  async getAllOrders(): Promise<OrderModel[]> {
    if (store.getState().ordersState.orders.length === 0) {

      const orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.ordersUrl))
      store.dispatch(fetchOrdersAction(orders))
    }
    return store.getState().ordersState.orders
  }


  async addOrder(order: OrderModel): Promise<OrderModel> {

    const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order))
    store.dispatch(addOrderAction(addedOrder))
    return addedOrder
  }

  //  count orders:
  async countOrders(): Promise<number> {

    const count = await firstValueFrom(this.http.get<number>(environment.ordersCountUrl))

    return count
  }

  //Get most recent order by user:
  getMostRecentOrder(): OrderModel {
    let lastOrder: OrderModel;
    const loggedInUser = store.getState().authState.user
    if (loggedInUser !== null) {
      store.getState().ordersState.orders.forEach(o => {

        if (o.user && o.user._id !== loggedInUser._id) {
          // if the order is not of the current user
          return;
        }

        if (o.userId && o.userId !== loggedInUser._id) {
          // if the order is not of the current user
          return;
        }

        if (!lastOrder) {
          lastOrder = o;
          return;
        }
        if (o.createdAt > lastOrder.createdAt) {
          lastOrder = o;
        }
      })
    }

    return lastOrder;
  }
}
