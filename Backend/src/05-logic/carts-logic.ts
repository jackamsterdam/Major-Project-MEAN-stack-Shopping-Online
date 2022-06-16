import ErrorModel from "../03-models/error-model"

import { CartModel, ICartModel } from "../03-models/cart-model"
//!delete functions you didnt use 



//!no need to get all carts i think
async function getAllCarts(): Promise<ICartModel[]> {
    return CartModel.find().populate('user').exec()
}

//Get ONE Cart by ONE USER ...and  will have a createdAt which I can notify  you have open cart from [date]
//!you can find the user by checking userredux and then find the cart by the user then we dispaly when he opened his cart!! 
async function getCartByUser(_id: string): Promise<ICartModel[]> {
    return CartModel.find({ _id }).populate('user').exec()
}
    
//! Add cart - when user first adds an item to the cart the cart will be created I think  
async function addCart(cart: ICartModel): Promise<ICartModel> {
    const errors = cart.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)
    return cart.save()
}


//!Delete cart when user finishes an Order or empties out all the items actrually if he empties the cart maybe i should leave the cart to stay ??
//! should this function actually find by userID and delete ???????? 
async function deleteCart(_id: string): Promise<void> {
    const deletedCart = await CartModel.findByIdAndDelete(_id).exec()
    if (!deletedCart) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}





//!WHen user relogs in we need to get his cart???  this function is bad actaully cause we are not finding by the id of the cart but we are finding by the id of the user !! 
// async function getOneCart(_id: string): Promise<ICartModel> {
//     const cart = await CartModel.findById(_id).populate('user').exec()
//     if (!cart) throw new ErrorModel(404, `Resource with _id ${_id} not found.`)
//     return cart
// }



export default {
    getAllCarts,
    getCartByUser,
    addCart,
    deleteCart
}