import { Document, model, Schema } from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";

//1. Model interface describing the data in the model:
export interface IItemModel extends Document {
    quantity: number
    total: number  //! do i need total here ?////???????? I dont need price right?? cause price i get form product   and i dont need name cause name i get from proeduct 
    productId: Schema.Types.ObjectId
    cartId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const ItemSchema = new Schema<IItemModel>({
    quantity: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [0, "Quantity can't be negative"],
        max: [10000, "Price can't exceed 10000"]

    },
    total: {
        type: Number,
        required: [true, "Missing total"],   //!yes this line or no ??
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
ItemSchema.virtual('product', {
    ref: ProductModel,
    localField: 'productId',
    foreignField: '_id',
    justOne: true
})

//Virtual Fields: 
ItemSchema.virtual('cart', {
    ref: CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const ItemModel = model<IItemModel>('ItemModel', ItemSchema, 'items')

