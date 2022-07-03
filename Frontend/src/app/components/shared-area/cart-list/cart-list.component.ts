import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})


export class CartListComponent implements OnInit, OnDestroy {

  opened = true;  //!regina wanted todo this with redux???

  allItemsByCart: CartItemModel[]

  //! all this just becuase I need the cart id of the user so dumb I need to get first the cart by user and then i can get the cart 
  cartByUser: CartModel
  totalAmount:number;

  unsubscribe: Unsubscribe

  constructor(private notify: NotifyService, private cartsService: CartsService) { }

  async ngOnInit() {
    try {
      //!kores if user has no cart ( i thorwed an eror in backend  ( so only works if user has no cart !!!!!)!************************************************************************************************************************************************************************************************************************* */


        //! all this just becuase I need the cart id of the user so dumb I need to get first the cart by user and then i can get the cart  (btw gives me isClosed false only so I know its the right cart )
      // this.cartByUser = await this.cartsService.getCartByUser(store.getState().authState.user._id)
  
      // console.log("store.getState().authState.user._id", store.getState().authState.user._id);
      // console.log("this.cartByUser", this.cartByUser);
      //                                                                                       //!for this:
      //  this.allItemsByCart = await this.cartsService.getAllItemsByCart(this.cartByUser._id) 
      //  console.log(" this.allItemsByCart",  this.allItemsByCart);
      const cart = await this.cartsService.getCartByUser(store.getState().authState.user._id)
      this.allItemsByCart =  await this.cartsService.getAllItemsByCart(cart?._id)
      this.totalAmount = this.cartsService.getTotalCartAmount();

      this.unsubscribe = store.subscribe(() => {
        this.allItemsByCart = store.getState().cartsState.cartItems;
        this.totalAmount = this.cartsService.getTotalCartAmount();
       })
    } catch (err: any) {
      this.notify.error(err)
    }

  }


  log(state: string) {
    console.log(state)
  }


 async  deleteThisCard(arr: string[]) {
    console.log(arr)
    try {
      const confirmDelete = await confirm(`Are you sure you want to delete this item?`)
      if (!confirmDelete) return
      await this.cartsService.deleteProduct(arr[0], arr[1])
      this.notify.success('Item has been deleted')


      //!But the redux store should delete this ??? we are subscribed!!!  so why do i need these two lines:
      // const index = this.allItemsByCart.findIndex(i => i._id === arr[0]);
      // this.allItemsByCart.splice(index, 1);
    } catch (err: any) {
      this.notify.error(err)
    }
  }

 async deleteAllItems() {
  try {
    if (this.allItemsByCart.length === 0) return
    const confirmDelete = await confirm(`Are you sure you want to delete all items? This cannot be undone!`)
    if (!confirmDelete) return
 //!I am accessing the first item in the cart and accessing the cartId instead of getting cartId straight from cart is that ok ??? or should i get the cartID from the cart ????
    await this.cartsService.deleteAllItemsByCart(this.allItemsByCart[0].cartId)
    this.notify.success('All items in your cart have been deleted!')
    
  } catch (err: any) {
    this.notify.error(err)
  }
 }

//!How to calcualtae total???
calculateTotal() {
  //! this.allItemsByCart is not iterable
  // for (const item of this.allItemsByCart) {    why cant i do this ??? can i do this in angular??? 
  //   console.log(item)
  // }
  
}




  
  ngOnDestroy(): void {
    this.unsubscribe()
  }

}


// <mat-sidenav-container>
//     <button  class="toggle-button" (click)="opened = !opened"><mat-icon>shopping_cart</mat-icon></button>

//     <!-- mode: over (default) push side (shriknks width) Second way to open is with template reference variable   -->
//     <mat-sidenav #sidenav mode="side" (opened)="log('open')" (closed)="log('closed')" [(opened)]="opened">
//        <h2>My Cart</h2> 
//         <br>
//  <!-- <span *ngFor="let c of allItemsByCart">{{c.product.name }} | </span> -->
//  <app-sidenav-details *ngFor="let i of allItemsByCart" [item]="i"  (deleteItem)="deleteThisCard($event)"> </app-sidenav-details>
// <br>
// <button mat-raised-button class="delete-all" (click)="deleteAllItems()">Empty Cart</button>
//         Total: {{calculateTotal()}}
//         <button  class="toggle-button" (click)="opened = !opened"><mat-icon>shopping_cart</mat-icon></button>
//         <!-- yPosition="above" -->

//        <a routerLink="/order"><mat-icon>shopping_cart_checkout</mat-icon></a> 
//     </mat-sidenav>


//     <mat-sidenav-content>
//         <button (click)="opened = !opened">Toggle Opened</button>
//         <button (click)="sidenav.open()">Open</button>
//         <button (click)="sidenav.close()">Close</button>
//         <button (click)="sidenav.toggle()">toggle</button>
//         <app-category-list></app-category-list>
//        <app-product-list></app-product-list>
   
//     </mat-sidenav-content>
// </mat-sidenav-container>