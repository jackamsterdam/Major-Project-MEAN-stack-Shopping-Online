import { CartItemModel } from "../models/cart-item.model";
import { CartModel } from "../models/cart.model";

//Carts State - carts data needed in the application level: 
export class CartsState {
    currentCart: CartModel;
    cartItems: CartItemModel[] = []
}

//Carts Action Type -any action which can be done on the above carts state
export enum CartsActionType {
    FetchCartItems = 'FetchCartItems',
    DeleteItemFromCart = 'DeleteItemFromCart',  //Delete one item 
    DeleteAllFromCart = 'DeleteAllFromCart',    //Delete all in cart
    GetActiveCart = "GetActiveCart"
}

//Carts Action - any single object sent to the store during 'dispatch':
export interface CartsAction {
    type: CartsActionType
    payload?: any
}

//Carts Action Creators - function for creating CartsAction objects. Each function creates an Action object: 
export function fetchCartItemsAction(items: CartItemModel[]): CartsAction {
    return { type: CartsActionType.FetchCartItems, payload: items }
}

// delete one item 
export function deleteItemFromCartAction(productId: string): CartsAction {
    return { type: CartsActionType.DeleteItemFromCart, payload: productId }
}

//delete all items
export function deleteAllFromCartAction(): CartsAction {
    return { type: CartsActionType.DeleteAllFromCart }  //???cartId or no payload cuase delte everything 
}

export function getActiveCartAction(cart: CartModel): CartsAction {
    return { type: CartsActionType.GetActiveCart, payload: cart }
}

// Carts Reducer - the main function performing any action on carts state:
// the new CartsState() is a default value for the first time only 
export function cartsReducer(currentState = new CartsState(), action: CartsAction): CartsState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState }

    switch (action.type) {
        case CartsActionType.FetchCartItems:
            newState.cartItems = action.payload
            break;
        case CartsActionType.DeleteItemFromCart:

            const indexToDelete = newState.cartItems.findIndex(c => c.productId === action.payload)
            if (indexToDelete >= 0) {
                newState.cartItems.splice(indexToDelete, 1)
            }
            break;
        case CartsActionType.DeleteAllFromCart:
            newState.cartItems.length = 0
            break;
        case CartsActionType.GetActiveCart:
            newState.currentCart = action.payload
    }

    return newState
}