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

    constructor(quantity: number, productId: string, cartId: string, total: number) {
        this.quantity = quantity
        this.productId = productId
        this.cartId = cartId
        this.total = total
    }
}
