import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { CartModel } from 'src/app/models/cart.model';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { OrderModel } from 'src/app/models/order.model';
import { RoleEnum } from 'src/app/models/role.enum';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  credentials = new CredentialsModel()
  user: UserModel
  unsubscribe: Unsubscribe
  currentCart: CartModel //Will show only if has open cart
  lastOrder: OrderModel;
 
  constructor(private authService: AuthService, private notify: NotifyService, private router: Router,private ordersService: OrdersService) { }
  ngOnInit(): void {
    this.user = store.getState().authState.user

  this.unsubscribe = store.subscribe(() => {
    
    this.user = store.getState().authState.user
    this.currentCart = store.getState().cartsState.currentCart;
    this.lastOrder = this.ordersService.getMostRecentOrder();
  })

}

ngOnDestroy(): void {
  this.unsubscribe()
}

 async submit() {
  try {
    await this.authService.login(this.credentials)

    this.notify.success("You have been logged in");
    
   //! delte this casue we staay on same page  this.router.navigateByUrl('/home') ///
   if (this.user.role === RoleEnum.Admin) {
    this.router.navigateByUrl('/admin') //!change to real admin page  and also make sure admin cant just type in the url the user shopping page  make him redirect from there 
   }
  } catch (err: any) {
    this.notify.error(err)
  }
 }

 getLoggedInState() {
  
    if (!this.currentCart && !this.lastOrder && this.user) {
      return 'Start Shopping'
    }

    return 'Resume Shopping'
 }

}
