import ErrorModel from "../03-models/error-model"
import { IOrderModel, OrderModel } from "../03-models/order-model";
import cartsLogic from '../05-logic/carts-logic';
//!erase functions you wont use 
//! i am not populating user and cart anywhere ?

// Add Order 
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    console.log("order", order);
    const errors = order.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    console.log("order.cartId", order.cartId);
    console.log("order.cartId.tostring", order.cartId.toString());
    await cartsLogic.closeCart(order.cartId.toString())
   // add an order
   return order.save();
   
}

 async function getReceiptById(_id: string):Promise<IOrderModel> {
    return OrderModel.findById({_id} ).populate('cart').populate('user').exec()
 }


//!Dont need this just for testing
async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate('cart').populate('user').exec()
}

//Count orders
async function countOrders():Promise<number> {
    return OrderModel.find().count().exec()
}

//Get most recent order to display on opening page (among users many closed orders gets the most recent only)
//weird that it works findOne with sort but works - gives me most recent 
async function getMostRecentOrder(userId: string):Promise<IOrderModel> {
    return OrderModel.findOne({userId}).sort({createdAt: -1}).exec()
    //!somehow get most recent createdAT only!!!!!! 
}

export default {
    addOrder,
    getAllOrders,
    getReceiptById,
    countOrders,
    getMostRecentOrder
}