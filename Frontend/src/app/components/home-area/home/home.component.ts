import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
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


export class HomeComponent implements OnInit {
  unsubscribe: Unsubscribe
  user: UserModel
 
  


  //now i have all th maarechet fulled with all that i need for the rest of the baby components

  constructor(private notify: NotifyService, private productsService: ProductsService, private ordersService: OrdersService, private cartsService: CartsService) { }

  async ngOnInit() {

    //! subscribe to user after login and after getting the user do the following: 
    // fetchproducts
    //  fetch all orders
    //   get all categories and   //I dont need all cateogires yet so i wont get them her e
    //    get cart of the user 

    try {

      // When user arrives to home page I am getting everything that I need from backend through my services and filling up my store with all the data I need for my child components ()
      //!so i need it outisde and in subscribe the same thing????
  
      // this.cartByUser = 
      this.user = store.getState().authState.user
      if (this.user) {

       
       this.productsService.getAllProducts()
       this.ordersService.getAllOrders()

        // צריך לשמור את הנתון הזה ברדוקס???
        this.cartsService.getCartByUser(this.user._id)

      }




   

    } catch (err: any) {
      this.notify.error(err)
    }

  }













  }
