import ErrorModel from "../03-models/error-model"
import { IOrderModel } from "../03-models/order-model";
//!erase functions you wont use 
//! i am not populating user and cart anywhere ?

// Add Order 
async function addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

  
    return order.save()
}




export default {
    addOrder
}