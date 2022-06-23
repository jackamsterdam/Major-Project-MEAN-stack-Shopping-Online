import { CartItemModel } from "../models/cart-item.model";

export class CartsState {
    cartId: string = null
    cartItems: CartItemModel[] = []
    //! totalAmount ?????? 
}

//Carts State - carts data needed in the application level: 
export enum CartsActionType { 
    FetchCartItems = 'FetchCartItems',
    AddItemToCart = 'AddItemToCart',
    // UpdateItemInCart = 'UpdateItemInCart',   //! I put update in add 
    DeleteItemFromCart =  'DeleteItemFromCart',  //Delete one item 
    DeleteAllFromCart =  'DeleteAllFromCart'    //Delete all in cart
}

//Carts Action - any single object sent to the store during 'dispatch':
export interface CartsAction {
    type: CartsActionType
    payload: any
}


//Carts Action Creators - function for creating CartsAction objects. Each function creates an Action object: 
export function fetchCartItemsAction(items: CartItemModel[]):CartsAction {
    return {type: CartsActionType.FetchCartItems, payload: items}
}
export function addItemToCartAction(item: CartItemModel, userId: string):CartsAction {
    return {type: CartsActionType.AddItemToCart, payload: {item, userId}}  //!מותר לכתוב כך??
}

//! UPDATE ??????????? i put update in add 

// delete one item 
export function deleteItemFromCartAction(_id: string, cartId: string): CartsAction {
    return {type: CartsActionType.DeleteItemFromCart, payload: {_id, cartId}}  //!מותר לכתוב כך?? 
}

//delete all items
export function deleteAllFromCartAction(cartId: string): CartsAction {
    return {type: CartsActionType.DeleteAllFromCart, payload: cartId}  //???cartId or no payload cuase delte everything 
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
            // newState.products.push(action.payload)
            // מה אני צריך להוסיף לקארט ??????? חדש בקארט מודל או לא כי בבק אנד הוספנו קארט חדש

        break;
        // case ProductsActionType.UpdateProduct:
        //     const indexToUpdate = newState.products.findIndex(p => p._id === action.payload._id)   
        //     if (indexToUpdate >= 0) {
        //         newState.products[indexToUpdate]  = action.payload
        //     } 
        // break;
        case CartsActionType.DeleteItemFromCart:
          const indexToDelete = newState.cartItems.findIndex(c => c._id === action.payload._id && action.payload.userId)  
          if (indexToDelete >= 0) {
              newState.cartItems.splice(indexToDelete, 1)
          }
        break;
        case CartsActionType.DeleteAllFromCart:
        //   = []    
        //but i need to find by cartId
        break;
    }

    return newState
}