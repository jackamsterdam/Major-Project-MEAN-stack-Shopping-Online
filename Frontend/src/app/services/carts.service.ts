import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItemModel } from '../models/cart-item.model';
import { CartModel } from '../models/cart.model';
import { addItemToCartAction, deleteAllFromCartAction, deleteItemFromCartAction, fetchCartItemsAction, getActiveCartAction, updateItemToCartAction } from '../redux/carts-state';
import store from '../redux/store';
///!add store!!! to evertying 
@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }



  async getAllItemsByCart(cartId: string): Promise<CartItemModel[]> {
    // Do i want to get from redux vs getting from server ??????????????????????????????????????
    // if (store.getState().cartsState.cartItems.length === 0) {
    if (cartId) {
      const itemsByCart = await firstValueFrom(this.http.get<CartItemModel[]>(environment.cartItemsByCartUrl + cartId))
          store.dispatch(fetchCartItemsAction(itemsByCart))
          return itemsByCart
    }
    return [];
    
    }
    // return store.getState().productsState.products
  // } 


//!good name????? cause we dont know if its either creating a new cart and adding first product or updateing that product or adding an item to the cart without creating a new cart 
//!btw even though in the back we are creating a new cart do we neeed to create a new cart in the fron as well like does the fron tneed to knwo about the new cart ???
//!and is it right to write addedItem??? cause there is a case it returns updated cart
  async addItem(item: CartItemModel, userId: string):Promise<CartItemModel> {


  //We need to add userId even though its post cause userId is additional information ......
  //!is there a way to send everything in the body even the userId as well ??????
    const addedItem = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemsUrl + userId, item))
  //   debugger
  //  store.dispatch(addItemToCartAction(addedItem))
    return addedItem
  }

  async updateItem(item: CartItemModel, userId: string):Promise<CartItemModel> {


  //We need to add userId even though its post cause userId is additional information ......
  //!is there a way to send everything in the body even the userId as well ??????
    const updatedItem = await firstValueFrom(this.http.post<CartItemModel>(environment.cartItemsUrl + userId, item))
    // store.dispatch(updateItemToCartAction(updatedItem))
    return updatedItem
  }


  // delete one item 
  async deleteProduct(productId: string, cartId: string):Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + productId + '/' + cartId))  //!make sure שרשור works
    store.dispatch(deleteItemFromCartAction(productId))
  }

  //delete all items
  async deleteAllItemsByCart(cartId: string):Promise<void> {
    await firstValueFrom(this.http.delete(environment.cartItemsUrl + cartId))  
    // store.dispatch(deleteProductAction(_id))
    store.dispatch(deleteAllFromCartAction())
  }





//----------------------------------------------------------------------
    //!only needed for some info on program start  (no redux) right??
    async getCartByUser(userId: string):Promise<CartModel> {
      const cartByUser = await firstValueFrom(this.http.get<CartModel>(environment.cartByUserUrl + userId))
      store.dispatch(getActiveCartAction(cartByUser))
      return cartByUser 
     }

   getTotalCartAmount() {
      // go over all the cart items, calculate the total amount of the cart
      const cartItems = store.getState().cartsState.cartItems
      const total = cartItems.reduce((accumulator, currVal) => {
        // debugger
        return accumulator + (currVal.quantity * currVal.product.price)

      }, 0)
    
      return total;
    }
     
}
