import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductDialogComponent } from '../../products-area/product-dialog/product-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})


export class CartListComponent implements OnInit, OnDestroy {

  opened = true;
  isShoppingPage = true
  allItemsByCart: CartItemModel[]
  cartByUser: CartModel
  totalAmount: number;
  unsubscribe: Unsubscribe

  constructor(private notify: NotifyService, private cartsService: CartsService, public dialog: MatDialog) { }

  async ngOnInit() {
    try {
      const cart = await this.cartsService.getCartByUser(store.getState().authState.user._id)
      this.allItemsByCart = await this.cartsService.getAllItemsByCart(cart?._id)
      this.totalAmount = this.cartsService.getTotalCartAmount();

      if (store.getState().cartsState.cartItems.length === 0) {
        this.opened = false;
      }
      if (cart?.isClosed) {
        this.totalAmount = this.cartsService.getTotalCartAmount();
      }

      this.unsubscribe = store.subscribe(() => {
        this.allItemsByCart = store.getState().cartsState.cartItems;
        this.totalAmount = this.cartsService.getTotalCartAmount();
      })
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async deleteThisCard(arr: string[]) {
    try {
      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        data: { action: 'remove' }
      })
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result === false || result === undefined) return
        await this.cartsService.deleteProduct(arr[0], arr[1])
        this.notify.success('Item has been deleted')
      })
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async deleteAllItems() {
    try {
      if (this.allItemsByCart.length === 0) return

      let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        data: { action: 'removeAll' }
      })

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result === false || result === undefined) return

        await this.cartsService.deleteAllItemsByCart(this.allItemsByCart[0].cartId)
        this.notify.success('All items in your cart have been deleted!')
      })
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async addProduct(product: ProductModel) {
    let dialogRef = this.dialog.open(ProductDialogComponent)

    //An action to do when closing dialog (updating the cart)
    dialogRef.afterClosed().subscribe(async (quantity) => {

      if (!quantity) return
      try {
        const total = (quantity) * product.price
        //object oriented thinking: 
        const itemToBeAddedToCart = new CartItemModel(quantity, product._id, store.getState().cartsState.currentCart?._id, total)
        await this.cartsService.addItem(itemToBeAddedToCart, store.getState().authState.user._id)
        this.notify.success("Item's in cart have been updated")

        //this updates the store (through backend) after you add with the new updated item 
        const cart = await this.cartsService.getCartByUser(store.getState().authState.user._id)
        await this.cartsService.getAllItemsByCart(cart?._id)

      } catch (err: any) {
        this.notify.error(err)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

}

