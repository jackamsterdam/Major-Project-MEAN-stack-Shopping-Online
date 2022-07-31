import ErrorModel from "../03-models/error-model"
import { ICartItemModel, CartItemModel } from "../03-models/cart-item-model"
import cartsLogic from '../05-logic/carts-logic'
import { CartModel } from "../03-models/cart-model"

//!erase functions you wont use 
//!check comments of this whole page!!! not sure about it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//This function is used for the receipt as well to get all items in the cart
//This is how we fill up the left side of the cart when user re-logs in : 
async function getAllItemsByCart(cartId: string): Promise<ICartItemModel[]> {
    return CartItemModel.find({ cartId }).populate('cart').populate('product').exec()
}

async function getOneItemFromACart(productId: string): Promise<ICartItemModel> {
    const oneItem = await CartItemModel.findById({productId}).populate('product').exec()
    // if (!oneItem) throw new ErrorModel(404, `Resource with _id ${productId} not found.`)
    return oneItem
}

// but everytime a user clicks to add item to the cart we need add item with a connection to the cart (and connection to product) ...  // so how we do this do i send an id of the cartID and a productID in a select (like in angular i put two select boxes one for the product he chooses and other for which user he is ????????)
// Add item to items 
//User adds item to cart - new cart is created with added product
async function addItem(item: ICartItemModel, userId: string): Promise<ICartItemModel> {

    //Validation
    const errors = item.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)
    // Case where no cart exists
    if (!item.cartId) {
        // add new cart with userId
        const newCart = await cartsLogic.addCart(new CartModel({userId, isClosed: false}))
        // update the cart id in the new item
        item.cartId = newCart._id;
        // Add new item to the cart
        return item.save()
    }

    if (item.cartId) {
        // find the item in the cart and update the item
        await CartItemModel.updateOne({ cartId: item.cartId, productId: item.productId }, { $set: { quantity: item.quantity, total: item.total } }).exec()
        let found = await CartItemModel.findOne({ cartId: item.cartId, productId: item.productId }).exec()
        // console.log('***********************found ', found, item.cartId, item.productId)

        if (!found) {
            console.log('item  doesnt exist in cart: ' + item.cartId)
            // Add new item to the cart

            return item.save()
            // found =  await getOneItemFromACart(item.productId.toString())

            return found;
        } else {
            console.log('item exists already just updating it ')
           return found;
        }

    }

}




//Delete item - when user presses x on item on the cart :
// if you delete the item then that means the productID and the cartId gets deleted with it  
async function deleteItem(productId: string, cartId: string): Promise<void> {

    // const deletedItembefore = await CartItemModel.findOne({ cartId, productId })
    // console.log("deletedItembefore", deletedItembefore);

    const deletedItem = await CartItemModel.deleteOne({productId, cartId}).exec()
    // console.log("deletedItem", deletedItem);
    // const deletedItem = await CartItemModel.findByIdAndDelete(_id).exec()

    // deprecated: 
    // const deletedItem = await CartItemModel.findOne({
    //     _id: _id,
    //     cartId: cartId
    // })
    //     .remove()
    //     .exec();

    // const deletedItemq = await CartItemModel.findOne({
      
    //    productId: productId,
    //     cartId: cartId
    // })
    // console.log("deletedItemq", deletedItemq);


    if (!deletedItem) throw new ErrorModel(404, `Resource with productId ${productId} or cartId ${cartId} not found`)
}

// delete collection 
async function deleteAllItemsByCart(cartId: string): Promise<void> {


    // const deletedItem = await CartItemModel.findByIdAndDelete(_id).exec()
    const deletedCartItems = await CartItemModel.deleteMany({ cartId })

    if (!deletedCartItems) throw new ErrorModel(404, `Resources with _id ${cartId} not found`)
}


export default {
    getAllItemsByCart,
    addItem,
    deleteItem,
    deleteAllItemsByCart
}