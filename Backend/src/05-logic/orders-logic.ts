import ErrorModel from "../03-models/error-model"
import { IOrderModel, OrderModel } from "../03-models/order-model";
import cartsLogic from '../05-logic/carts-logic';
//!erase functions you wont use 
//! i am not populating user and cart anywhere ?

// Add Order 
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    await cartsLogic.closeCart(order.cartId.toString())
   // add an order
   return order.save();
   
}

 async function getReceiptById(_id: string):Promise<IOrderModel> {
    return OrderModel.findById({_id} ).populate('cart').populate('user').exec()
 }


//!Dont need this just for testing
async function getOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate('cart').populate('user').exec()
}

export default {
    addOrder,
    getOrders,
    getReceiptById
}