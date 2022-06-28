// fetch orders  redux  just for front page 

import { OrderModel } from "../models/order.model";

//Orders State - orders data needed in the application level: 
export class OrdersState {
    orders: OrderModel[] = []
}

//Orders Action Type -any action which can be done on the above orders state
export enum OrdersActionType { 
    FetchOrders = 'FetchOrders'
}

//Orders Action - any single object sent to the store during 'dispatch':
export interface OrdersAction {
    type: OrdersActionType
    payload: any //!maybe cahnge from any to something else 
}


//Orders Action Creators - function for creating OrdersAction objects. Each function creates an Action object:  
export function fetchOrdersAction(orders: OrderModel[]):OrdersAction {
    return {type: OrdersActionType.FetchOrders, payload: orders}
}

// Orders Reducer - the main function performing any action on orders state:
// the new OrdersState() is a default value for the first time only 
export function ordersReducer(currentState = new OrdersState(), action: OrdersAction):OrdersState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = {...currentState}

    switch(action.type) {
        case OrdersActionType.FetchOrders:
            newState.orders = action.payload
        break;
       
    }

    return newState
}