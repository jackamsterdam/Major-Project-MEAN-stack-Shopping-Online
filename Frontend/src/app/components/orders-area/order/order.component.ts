import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  allItemsByCart: CartItemModel[]
  cartByUser: CartModel
  totalAmount: number = 0;
  constructor(private notify: NotifyService, private cartsService: CartsService) { }

  //!Regina why cant I use cart-list component details casue Im doing exactly the same thign again here ????????  well i did the dsame thinig cause not everything I need from there   and also i didnt put subscribe here 
  async ngOnInit() {
    try {
      this.cartByUser = await this.cartsService.getCartByUser(store.getState().authState.user._id)
      this.allItemsByCart = await this.cartsService.getAllItemsByCart(this.cartByUser?._id)
      this.totalAmount = this.cartsService.getTotalCartAmount();
    } catch (err: any) {
      this.notify.error(err)
    }
  }



}
