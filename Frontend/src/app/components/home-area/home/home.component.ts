import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
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
        debugger
        if (store.getState().authState.user != this.user) {
          debugger
          this.user = store.getState().authState.user

            if (this.user) {
              // debugger
              // When user arrives to home page after logging in, I am getting everything that I need from backend through my services and filling up my store with all the data I need for my child components () 
              //now i have all th maarechet fulled with all that i need for the rest of the baby components
              await this.productsService.getAllProducts()
              await this.ordersService.getAllOrders()
              await this.productsService.getAllCategories()
          
              // צריך לשמור את הנתון הזה ברדוקס???
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
