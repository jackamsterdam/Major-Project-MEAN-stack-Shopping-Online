import ErrorModel from "../03-models/error-model"
import { CartModel, ICartModel } from "../03-models/cart-model"
//!delete functions you didnt use 



//!no need to get all carts i think
async function getAllCarts(): Promise<ICartModel[]> {
    return CartModel.find().populate('user').exec()
}

//Get ONE OPEN! Cart by ONE USER ...and  will have a createdAt which I can notify  you have open cart from [date]
//!you can find the user by checking userredux and then find the cart by the user then we dispaly when he opened his cart!! 
async function getCartByUser(userId: string, isClosed: boolean): Promise<ICartModel> {
    const carts =  await CartModel.find({userId, isClosed }).populate('user').exec()
//    if (carts.length === 0) throw new ErrorModel(400, 'User has no open cart')
   if (carts.length === 0) return null
    return carts[0]
}
    
//! Add cart - when user first adds an item to the cart the cart will be created I think  
// This function is called in cart-item logic when user adds cart for the first time - if no cart exists a new cart is created. 
async function addCart(cart: ICartModel): Promise<ICartModel> {
    const errors = cart.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)
    return cart.save()
}

//Close the cart when making an order - orders logic uses this function to close the specific cart (no route to surf to)
async function closeCart(_id: string):Promise<ICartModel> {

  // await CartModel.findByIdAndUpdate({cartId}).exec()
    // const updatedCart = await CartModel.findByIdAndUpdate(cartId, product, { returnOriginal: false }).exec();

    await CartModel.updateOne({ _id }, { $set: { isClosed: true } }).exec()
    // await CartModel.updateOne({ cartId }, { $set: { isClosed: true } }).exec() //!wrong be careful!! you dont have cartId in CartModel its _id!!
  

    const cart = await CartModel.findOne({ _id}).exec()
        // console.log("cart", cart);
    return cart;
}


//!Delete cart when user finishes an Order or empties out all the items actrually if he empties the cart maybe i should leave the cart to stay ??
//! should this function actually find by userID and delete ???????? 
// I dont deelte cart!! 
// async function deleteCart(_id: string): Promise<void> {
//     const deletedCart = await CartModel.findByIdAndDelete(_id).exec()
//     if (!deletedCart) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
// }




// no need 
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
    closeCart
    // deleteCart
}