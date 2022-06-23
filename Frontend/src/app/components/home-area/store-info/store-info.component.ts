import { ProductsService } from './../../../services/products.service';
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
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit, OnDestroy {
  numberOfProducts: number
  numberOfOrders: number
  user: UserModel
  unsubscribe: Unsubscribe
  dateOfOpenCart: Date
  cartByUser: CartModel //Will show only if has open cart
  orderByUser: OrderModel
  dateOfMostRecentOrder: Date



  constructor(private productsService: ProductsService, private ordersService: OrdersService, private cartsService: CartsService, private notify: NotifyService) { }

  async ngOnInit() {
    try {
      this.numberOfProducts = await this.productsService.countProducts()
      this.numberOfOrders = await this.ordersService.countOrders()

      this.user = store.getState().authState.user
      this.unsubscribe = store.subscribe(async () => {
        this.user = store.getState().authState.user



        if (this.user) {
        
          this.cartByUser = await this.cartsService.getCartByUser(this.user._id)
       
          this.dateOfOpenCart = this.cartByUser?.createdAt
         
            // Option B - User with no open carts
          if (!this.cartByUser) {  //is this really with no open carts???
         
            this.orderByUser = await this.ordersService.getMostRecentOrder(this.user._id)
    
            this.dateOfMostRecentOrder = this.orderByUser?.createdAt
          }
  
        }

  

      })
//!Repeated logic  cause i need on start and when changes 
            //!maybe put this in subscribe function 
        // Option A - User with open cart
        // Make sure there is a user 
        if (this.user) {
        
          this.cartByUser = await this.cartsService.getCartByUser(this.user._id)
       
          this.dateOfOpenCart = this.cartByUser?.createdAt
         
            // Option B - User with no open carts
          if (!this.cartByUser) {  //is this really with no open carts???
         
            this.orderByUser = await this.ordersService.getMostRecentOrder(this.user._id)
    
            this.dateOfMostRecentOrder = this.orderByUser?.createdAt
          }
  
        }
     


      // this doesnt work cause user is null undefined 
      // this.orderByUser =  await this.ordersService.getMostRecentOrder('62ab04da04e42a63f933a30b')
      // console.log("this.orderByUser", this.orderByUser);
      //   this.dateOfMostRecentOrder = this.orderByUser?.createdAt
      //   console.log("this.dateOfMostRecentOrder", this.dateOfMostRecentOrder);



      //this doesnt work casue user is null undefined if there is no user 
      // this.cartByUser = await this.cartsService.getCartByUser('62ab04da04e42a63f933a30b')      
      // this.cartByUser = await this.cartsService.getCartByUser(this.user._id)    
      // this.dateOfOpenCart = this.cartByUser.createdAt  


    } catch (err: any) {
      this.notify.error(err)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe()
  }

}



        //    //!maybe put this in subscribe function 
        // // Option A - User with open cart
        // // Make sure there is a user 
        // if (this.user) {
        //   console.log('Case where user with open cart still')
        //   console.log("this.user", this.user);
        //   this.cartByUser = await this.cartsService.getCartByUser(this.user._id)
        //   console.log("cartByUser", this.cartByUser);
        //   // console.log("isclosed", this.cartByUser.isClosed);
        //   console.log("cartByUser.createdAT", this.cartByUser?.createdAt);
        //   this.dateOfOpenCart = this.cartByUser?.createdAt
        //   console.log(" this.dateOfOpenCart",  this.dateOfOpenCart);
  
        //     // Option B - User with no open carts
        //   if (!this.cartByUser) {  //is this really with no open carts???
        //   console.log('Case where user has made an order and CLOSED his cart')

        //     this.orderByUser = await this.ordersService.getMostRecentOrder(this.user._id)
        //     console.log("this.orderByUser", this.orderByUser);
        //     this.dateOfMostRecentOrder = this.orderByUser?.createdAt
        //   }
  
        // }