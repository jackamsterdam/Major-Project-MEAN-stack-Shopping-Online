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
    //orderDate is by createdAt with timestamp below
    creditCard: number
    //! I only have function add order why i need this i dont use populate
    userId: Schema.Types.ObjectId  //! what is this for if i dont use it?? or do i in the receopt???
    cartId: Schema.Types.ObjectId  //! what is this for if i dont use it??  and cart has the user anyways so why need both car and user ?????????
}

//2. Model Schema describing validation, constraints and more:
const OrderSchema = new Schema<IOrderModel>({
    finalPrice: {
        type: Number,
        required: [true, "Missing final price"],
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
            //!condition if there is already 3 there ?????
    },

    creditCard: {
        type: Number,
        required: [true, "Missing credit card"], 
        // min: [14, "Credit card can't be less than 14 digits"],
        // max: [16, "Credit card can't be negative"],
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