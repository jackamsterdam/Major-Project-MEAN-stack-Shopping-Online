import { Document, model, Schema } from "mongoose";
import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";
import CityEnum from "./city-enum";

//1. Model interface describing the data in the model:
export interface IOrderModel extends Document {
    finalPrice: number
    shipCity: CityEnum
    shipStreet: string
    shipDate: Date
    creditCard: number
    userId: Schema.Types.ObjectId
    cartId: Schema.Types.ObjectId
}

//2. Model Schema describing validation, constraints and more:
const OrderSchema = new Schema<IOrderModel>({
    finalPrice: {
        type: Number,
        min: [0, "Final price can't be negative"],
        max: [100000, "Final price can't exceed 100,000"]

    },
    shipCity: {
        type: String,
        required: [true, "Missing ship city"],
        minlength: [2, "Ship city too short"],
        maxlength: [100, "Ship city too long"],
        enum: CityEnum

    },
    shipStreet: {
        type: String,
        required: [true, "Missing ship street"],
        minlength: [2, "Ship street too short"],
        maxlength: [100, "Ship street too long"],
        trim: true,

    },
    shipDate: {
        type: Date,
        required: [true, "Missing shipping date"],
    },

    creditCard: {
        type: Number,
        required: [true, "Missing credit card"],
        match: [/^[0-9]{14,16}$/, "Credit card must be a minimum of 14 numbers and max 16 numbers"],
        trim: true

    },
    userId: Schema.Types.ObjectId,
    cartId: Schema.Types.ObjectId

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
})

//Virtual Fields: 
OrderSchema.virtual('user', {
    ref: UserModel,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

//Virtual Fields: 
OrderSchema.virtual('cart', {
    ref: CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true
})


//3. Model Class - this is the final model class:
export const OrderModel = model<IOrderModel>('OrderModel', OrderSchema, 'orders')