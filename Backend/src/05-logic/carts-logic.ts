import ErrorModel from "../03-models/error-model"
import { CartModel, ICartModel } from "../03-models/cart-model"


//Get one open cart by one user 
async function getCartByUser(userId: string, isClosed: boolean): Promise<ICartModel> {

    const carts = await CartModel.find({ userId, isClosed }).populate('user').exec()
    if (carts.length === 0) return null
    return carts[0]
}

// Add cart - This function is called in cart-item logic when user adds cart for the first time - if no cart exists a new cart will be created. (no route to surf to from frontend)
async function addCart(cart: ICartModel): Promise<ICartModel> {

    const errors = cart.validateSync()
    
    if (errors) throw new ErrorModel(400, errors.message)
    return cart.save()
}

//Close the cart when making an order - orders logic uses this function to close the specific cart (no route to surf to from frontend)
async function closeCart(_id: string): Promise<ICartModel> {

    await CartModel.updateOne({ _id }, { $set: { isClosed: true } }).exec()

    const cart = await CartModel.findOne({ _id }).exec()
    return cart;
}


export default {
    getCartByUser,
    addCart,
    closeCart
}