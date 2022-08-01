import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store  from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnDestroy, OnInit {
  user: UserModel
  unsubscribe: Unsubscribe

  constructor(private productsService: ProductsService, private ordersService: OrdersService, private cartsService: CartsService, private notify: NotifyService) { }

  async ngOnInit() {
    try {

      this.unsubscribe = store.subscribe(async () => {
        if (store.getState().authState.user !== this.user) {
          this.user = store.getState().authState.user

          if (this.user) {

            await this.productsService.getAllProducts()
            await this.ordersService.getAllOrders()
            await this.productsService.getAllCategories()

            const cart = await this.cartsService.getCartByUser(this.user._id)
            await this.cartsService.getAllItemsByCart(cart?._id)

          }
        }
      })
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

}
