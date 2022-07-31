import { Document, model, Schema } from "mongoose";
import { UserModel } from "./user-model";

//1. Model interface describing the data in the model:
export interface ICartModel extends Document {
    userId: Schema.Types.ObjectId
    isClosed: boolean
}

//2. Model Schema describing validation, constraints and more:
const CartSchema = new Schema<ICartModel>({

    userId: Schema.Types.ObjectId,
    isClosed: {
        type: Boolean,
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
