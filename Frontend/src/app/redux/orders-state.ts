import { OrderModel } from "../models/order.model";

//Orders State - orders data needed in the application level: 
export class OrdersState {
    orders: OrderModel[] = []
    theLastOrder: OrderModel
}

//Orders Action Type -any action which can be done on the above orders state
export enum OrdersActionType {
    FetchOrders = 'FetchOrders',
    AddOrder = 'AddOrder'
}

//Orders Action - any single object sent to the store during 'dispatch':
export interface OrdersAction {
    type: OrdersActionType
    payload: any
}


//Orders Action Creators - function for creating OrdersAction objects. Each function creates an Action object:  
export function fetchOrdersAction(orders: OrderModel[]): OrdersAction {
    return { type: OrdersActionType.FetchOrders, payload: orders }
}

export function addOrderAction(order: OrderModel): OrdersAction {
    return { type: OrdersActionType.AddOrder, payload: order }
}

// Orders Reducer - the main function performing any action on orders state:
// the new OrdersState() is a default value for the first time only 
export function ordersReducer(currentState = new OrdersState(), action: OrdersAction): OrdersState {
    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState }

    switch (action.type) {
        case OrdersActionType.FetchOrders:
            newState.orders = action.payload
            break;
        case OrdersActionType.AddOrder:
            newState.theLastOrder = action.payload
            newState.orders.push(action.payload)
            break;
    }

    return newState
}