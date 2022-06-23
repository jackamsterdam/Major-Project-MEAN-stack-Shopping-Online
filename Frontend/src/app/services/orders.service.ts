import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }



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
  async  getMostRecentOrder(userId: string):Promise<OrderModel> {
    const recentOrder = await firstValueFrom(this.http.get<OrderModel>(environment.recentOrderByUserUrl + userId))
    return recentOrder
  }
}
