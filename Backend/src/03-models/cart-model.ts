import { Document, model, Schema } from "mongoose";
import { UserModel } from "./user-model";

//1. Model interface describing the data in the model:
export interface ICartModel extends Document {
    // createdAt: Date   //did timestamp instead 
    userId: Schema.Types.ObjectId
    isClosed: boolean
}

//2. Model Schema describing validation, constraints and more:
const CartSchema = new Schema<ICartModel>({
    // another way: 
    // createdAt: {
    //     type: Date,
    //     required: [true, "Missing date"],
    //     // default: Date.now
    //      default: new Date()
    // },
    userId: Schema.Types.ObjectId,
    isClosed: {
        type: Boolean,
        // required: [true, "Missing price"],
        // min: [0, "Price can't be negative"],
        // max: [1000, "Price can't exceed 1000"]
        default: false

    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
})

//Virtual Fields: 
CartSchema.virtual('user', {
    ref: UserModel,
    localField: 'userId',
    foreignField: '_id',
    justOne: true

})

//3. Model Class - this is the final model class:
export const CartModel = model<ICartModel>('CartModel', CartSchema, 'carts')
