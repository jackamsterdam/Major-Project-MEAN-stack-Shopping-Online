import ErrorModel from "../03-models/error-model"
import { IOrderModel, OrderModel } from "../03-models/order-model";
import cartsLogic from '../05-logic/carts-logic';

// Add Order 
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    await cartsLogic.closeCart(order.cartId.toString())
    // add an order
    return order.save();

}

async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().populate('cart').populate('user').exec()
}

//Count orders
async function countOrders(): Promise<number> {
    return OrderModel.find().count().exec()
}

export default {
    addOrder,
    getAllOrders,
    countOrders,
}