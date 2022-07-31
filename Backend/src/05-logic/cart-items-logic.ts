import ErrorModel from "../03-models/error-model"
import { ICartItemModel, CartItemModel } from "../03-models/cart-item-model"
import cartsLogic from '../05-logic/carts-logic'
import { CartModel } from "../03-models/cart-model"

//This is how we fill up the left side of the cart when user re-logs in: 
async function getAllItemsByCart(cartId: string): Promise<ICartItemModel[]> {
    return CartItemModel.find({ cartId }).populate('cart').populate('product').exec()
}

//User adds new item first time - cart is created and item added or
//  User adds new item to existing cart - item is added to cart or
//  User updates existing item in cart 
async function addItem(item: ICartItemModel, userId: string): Promise<ICartItemModel> {

    //Validation
    const errors = item.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)
    // Case where no cart exists
    if (!item.cartId) {
        // add new cart with userId
        const newCart = await cartsLogic.addCart(new CartModel({ userId, isClosed: false }))
        // update the cart id with the new item
        item.cartId = newCart._id;
        // Add new item to the cart
        return item.save()
    }

    //Case where cart exists:
    if (item.cartId) {
        // find the item in the cart and update the item
        await CartItemModel.updateOne({ cartId: item.cartId, productId: item.productId }, { $set: { quantity: item.quantity, total: item.total } }).exec()
        let found = await CartItemModel.findOne({ cartId: item.cartId, productId: item.productId }).exec()

        // add item that does not exist in cart: 
        if (!found) {
            // Add new item to the cart
            return item.save()
        } else {
            return found;
        }
    }
}

//Delete item - when user presses x on item on the cart :
// if you delete the item then that means the productID and the cartId gets deleted with it  
async function deleteItem(productId: string, cartId: string): Promise<void> {

    const deletedItem = await CartItemModel.deleteOne({ productId, cartId }).exec()

    if (!deletedItem) throw new ErrorModel(404, `Resource with productId ${productId} or cartId ${cartId} not found`)
}

// delete collection 
async function deleteAllItemsByCart(cartId: string): Promise<void> {

    const deletedCartItems = await CartItemModel.deleteMany({ cartId })

    if (!deletedCartItems) throw new ErrorModel(404, `Resources with _id ${cartId} not found`)
}


export default {
    getAllItemsByCart,
    addItem,
    deleteItem,
    deleteAllItemsByCart
}