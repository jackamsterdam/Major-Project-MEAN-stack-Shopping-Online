import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';
import { fetchOrdersAction } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  //For login page to dislay number of orders:
  async getAllOrders():Promise<OrderModel[]> {
    if (store.getState().ordersState.orders.length === 0) {

      const orders = await firstValueFrom(this.http.get<OrderModel[]>(environment.ordersUrl))
      store.dispatch(fetchOrdersAction(orders))
    }
    return store.getState().ordersState.orders
  } 


  async addOrder(order: OrderModel): Promise<OrderModel> {

    const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order))
    //!no store for orders
    return addedOrder
  }

  // for receipt 
  async getReceiptById(_id: string): Promise<OrderModel> {
    const receipt = await firstValueFrom(this.http.get<OrderModel>(environment.receiptUrl + _id))
    return receipt
  }

  //  count orders:
  async countOrders(): Promise<number> {

    const count = await firstValueFrom(this.http.get<number>(environment.ordersCountUrl))

    return count
  }

  //Get most recent order by user:
   getMostRecentOrder():OrderModel {
   let lastOrder: OrderModel;
   const loggedInUser =  store.getState().authState.user

    store.getState().ordersState.orders.forEach(o =>{
      if (o.user._id !== loggedInUser._id) {
        // if the order is not of the current user
        return;
      }

      if (!lastOrder) {
        lastOrder = o;
        return;
      }
      if (o.createdAt > lastOrder.createdAt){
           lastOrder = o;
      }
   })

   return lastOrder;
    // const recentOrder = await firstValueFrom(this.http.get<OrderModel>(environment.recentOrderByUserUrl + userId))
    // return recentOrder
  }
}
