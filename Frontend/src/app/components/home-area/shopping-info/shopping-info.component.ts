import { ProductsService } from '../../../services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserModel } from 'src/app/models/user.model';
import { Unsubscribe } from 'redux';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';

@Component({
  selector: 'app-shopping-info',
  templateUrl: './shopping-info.component.html',
  styleUrls: ['./shopping-info.component.scss']
})
export class ShoppingInfoComponent implements OnInit, OnDestroy {
  numberOfProducts: number
  numberOfOrders: number
  user: UserModel
  unsubscribe: Unsubscribe
  currentCart: CartModel 
  totalAmount: number = 0;
  lastOrder: OrderModel;

  constructor(private productsService: ProductsService, private ordersService: OrdersService, private cartsService: CartsService, private notify: NotifyService) { }

  async ngOnInit() {
    
    try {

      this.numberOfProducts = await this.productsService.countProducts()
      this.numberOfOrders = await this.ordersService.countOrders()

      this.unsubscribe = store.subscribe(() => {
        
        this.user = store.getState().authState.user
        this.currentCart = store.getState().cartsState.currentCart;

        this.totalAmount = this.cartsService.getTotalCartAmount();
        this.lastOrder = this.ordersService.getMostRecentOrder();
      })

    } catch (err: any) {
      this.notify.error(err)
    }
  }

  getOrderText() {
    if (this.numberOfOrders > 1){
      return `So far our store has had a total of ${this.numberOfOrders} orders!`
    } 

    if (this.numberOfOrders === 1) {
     return 'Our store currently has one order.'
    }
     
    return 'Our store currently has no orders!'
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

}

