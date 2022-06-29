import { CartModel } from "./cart.model"
import { ProductModel } from "./product.model"

export class CartItemModel {
    _id: string 

    quantity: number
    total: number 
 
    productId: string 
    product: ProductModel

    cartId: string 
    cart: CartModel

// do constructor assignment after 
    //! am i supposed to do this???? am i allowed to do it with not all the data memebers above??? 
    constructor(quantity: number, productId: string, cartId: string, total: number) {
        this.quantity = quantity
        this.productId = productId
        this.cartId = cartId
        this.total = total
    }
}
