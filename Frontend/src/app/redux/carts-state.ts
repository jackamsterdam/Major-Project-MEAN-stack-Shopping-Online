import { CartItemModel } from "../models/cart-item.model";

//Carts State - carts data needed in the application level: 
export class CartsState {
    cartId: string = null
    cartItems: CartItemModel[] = []
    //! totalAmount ?????? 
}

//Carts Action Type -any action which can be done on the above carts state
export enum CartsActionType { 
    FetchCartItems = 'FetchCartItems',
    AddItemToCart = 'AddItemToCart',
    UpdateItemInCart = 'UpdateItemInCart',   //! I put update in add 
    DeleteItemFromCart =  'DeleteItemFromCart',  //Delete one item 
    DeleteAllFromCart =  'DeleteAllFromCart'    //Delete all in cart
}

//Carts Action - any single object sent to the store during 'dispatch':
export interface CartsAction {
    type: CartsActionType
    payload?: any
}

//Carts Action Creators - function for creating CartsAction objects. Each function creates an Action object: 
export function fetchCartItemsAction(items: CartItemModel[]):CartsAction {
    return {type: CartsActionType.FetchCartItems, payload: items}
}
export function addItemToCartAction(item: CartItemModel):CartsAction {
    return {type: CartsActionType.AddItemToCart, payload: item}  //!מותר לכתוב כך??
}
export function updateItemToCartAction(item: CartItemModel):CartsAction {
    return {type: CartsActionType.UpdateItemInCart, payload: item}  //!מותר לכתוב כך??
}

//! UPDATE ??????????? i put update in add 

// delete one item 
export function deleteItemFromCartAction(productId: string): CartsAction {
    return {type: CartsActionType.DeleteItemFromCart, payload: productId}  //!מותר לכתוב כך?? 
}

//delete all items
export function deleteAllFromCartAction(): CartsAction {
    return {type: CartsActionType.DeleteAllFromCart}  //???cartId or no payload cuase delte everything 
}

// Carts Reducer - the main function performing any action on carts state:
// the new CartsState() is a default value for the first time only 
export function cartsReducer(currentState = new CartsState(), action: CartsAction):CartsState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = {...currentState}

    switch(action.type) {
        case CartsActionType.FetchCartItems:
            newState.cartItems = action.payload
        break;
        case CartsActionType.AddItemToCart:
            newState.cartItems.push(action.payload)
            // מה אני צריך להוסיף לקארט ??????? חדש בקארט מודל או לא כי בבק אנד הוספנו קארט חדש

        break;
        case CartsActionType.UpdateItemInCart:
            //! not sure if action.payload.productID or _id!!! 
            const indexToUpdate = newState.cartItems.findIndex(c => c._id === action.payload._id)   
            if (indexToUpdate >= 0) {
                newState.cartItems[indexToUpdate]  = action.payload
            } 
        break;
        case CartsActionType.DeleteItemFromCart:
            //![pay attention productId not _id!!!  cause that is what we are seding the productId (and cartId in the service we are not delteing just by _id of cartitem but by producgtID!! )]
          const indexToDelete = newState.cartItems.findIndex(c => c.productId === action.payload)  
          if (indexToDelete >= 0) {
              newState.cartItems.splice(indexToDelete, 1)
          }
        break;
        case CartsActionType.DeleteAllFromCart:
         newState.cartItems.length = 0  
        //but i need to find by cartId
        break;
    }

    return newState
}