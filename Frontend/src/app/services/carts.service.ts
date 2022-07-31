import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';
import { deleteAllFromCartAction, deleteItemFromCartAction, fetchCartItemsAction, getActiveCartAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }

  async getAllItemsByCart(cartId: string): Promise<CartItemModel[]> {
    if (cartId) {
      const itemsByCart = await firstValueFrom(this.http.get<CartItemModel[]>(environment.cartItemsByCartUrl + cartId))
      store.dispatch(fetchCartItemsAction(itemsByCart))
      return itemsByCart
    }
    return [];

  }

  async addItem(item: CartItemModel, userId: string): Promise<CartItemModel> {

    //We need to add userId even though its post cause userId is additional information ......
    const addedItem = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemsUrl + userId, item))
    return addedItem
  }


  // delete one item 
  async deleteProduct(productId: string, cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + productId + '/' + cartId))
    store.dispatch(deleteItemFromCartAction(productId))
  }

  //delete all items
  async deleteAllItemsByCart(cartId: string): Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + cartId))
    store.dispatch(deleteAllFromCartAction())
  }


  async getCartByUser(userId: string): Promise<CartModel> {

    const cartByUser = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId))
    store.dispatch(getActiveCartAction(cartByUser))
    return cartByUser
  }

  getTotalCartAmount() {
    // go over all the cart items, calculate the total amount of the cart
    const cartItems = store.getState().cartsState.cartItems
    const total = cartItems.reduce((accumulator, currVal) => {
      return accumulator + (currVal.quantity * currVal.product.price)
    }, 0)

    return total;
  }

}
