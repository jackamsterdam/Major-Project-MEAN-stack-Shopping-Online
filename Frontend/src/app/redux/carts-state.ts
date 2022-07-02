import { CartItemModel } from "../models/cart-item.model";
import { CartModel } from "../models/cart.model";

//Carts State - carts data needed in the application level: 
export class CartsState {
    currentCart: CartModel;
    cartItems: CartItemModel[] = []
    //! totalAmount ?????? 
}

//!in dialog i should create a cartId if not exist but not create it and use it if cartId exists !!!  this logic needs to be added here 

//Carts Action Type -any action which can be done on the above carts state
export enum CartsActionType { 
    FetchCartItems = 'FetchCartItems',
    AddItemToCart = 'AddItemToCart',
    UpdateItemInCart = 'UpdateItemInCart',   //! I put update in add 
    DeleteItemFromCart =  'DeleteItemFromCart',  //Delete one item 
    DeleteAllFromCart =  'DeleteAllFromCart',    //Delete all in cart

    GetActiveCart = "GetActiveCart"
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


export function getActiveCartAction(cart: CartModel):CartsAction {
    return {type: CartsActionType.GetActiveCart, payload:cart  }
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

            //! you need to set opened = true; for the cartlist component so after the model adds item to cart the sidenav will open !! 

            //!I need to make a new cart or what ??? with a new cartID for next time but tahts the case wherre i add an item to cart that doesnt exist but if does exist??
            //! I dont even have a cart store to make carts? do i need?

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

        case CartsActionType.GetActiveCart:
            newState.currentCart = action.payload   
         }

    return newState
}