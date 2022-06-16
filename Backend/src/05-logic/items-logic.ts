import ErrorModel from "../03-models/error-model"
import { IItemModel, ItemModel } from "../03-models/item-model"
//!erase functions you wont use 
//!check comments of this whole page!!! not sure about it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Get all Items - when user relogs in we need to get all items in the specific cart - actually no ! we only neeed specific by user and by cart only 
// async function getAllProducts(): Promise<IProductModel[]> {
//     return ProductModel.find().populate('category').exec()
// }

// do we need the userid as well ??? hmm ... well actually the cart has the userID ....... this is really hard to unserdstand all these connections takes a long time so what is the point of the cart if its just a cart why cant i connec teh items straight to items???? 
// and question is it better to populate by cart: CartModel.find({}).populate('item') יענו הפוך ??? מה המשמעות של הפוך 
//Get All itmes by one Cart by ONE USER ...

//This is how we fill up the left side of the cart when user relogs in : 
async function getAllItemsByCartWithProductNames(cartId: string, productId: string): Promise<IItemModel[]> {
    return ItemModel.find({ cartId, productId }).populate('cart').populate('product').exec()
}

// but everytime a user clicks to add item to the cart we need add item with a connection to the cart (and connection to product) ...  // so how we do this do i send an id of the cartID and a productID in a select (like in angular i put two select boxes one for the product he chooses and other for which user he is ????????)
// Add item to items 
async function addItem(item: IItemModel): Promise<IItemModel> {
    const errors = item.validateSync()
    if (errors) throw new ErrorModel(400, errors.message)

    return item.save()
}





//Delete item - when user presses x on item on the cart :
// if you delete the item then tht means the productID and the cartId gets deleted with it  
async function deleteItem(_id: string): Promise<void> {


    const deletedItem = await ItemModel.findByIdAndDelete(_id).exec()
    if (!deletedItem) throw new ErrorModel(404, `Resource with _id ${_id} not found`)
}


export default {
    getAllItemsByCartWithProductNames,
    addItem,
    deleteItem
}