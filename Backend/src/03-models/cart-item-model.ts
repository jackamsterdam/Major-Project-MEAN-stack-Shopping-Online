import { Document, model, Schema } from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";

//1. Model interface describing the data in the model:
export interface ICartItemModel extends Document {
    quantity: number
    total: number
    productId: Schema.Types.ObjectId
    cartId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const CartItemSchema = new Schema<ICartItemModel>({
    quantity: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [0, "Quantity can't be negative"],
        max: [100, "Quantity can't exceed 100 items"]

    },
    total: {
        type: Number,
        min: [0, "Total can't be negative"],

    },
    productId: Schema.Types.ObjectId,
    cartId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
})

//Virtual Fields: 
CartItemSchema.virtual('product', {
    ref: ProductModel,
    localField: 'productId',
    foreignField: '_id',
    justOne: true
})

//Virtual Fields: 
CartItemSchema.virtual('cart', {
    ref: CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const CartItemModel = model<ICartItemModel>('CartItemModel', CartItemSchema, 'items')

