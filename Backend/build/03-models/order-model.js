"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = require("mongoose");
var cart_model_1 = require("./cart-model");
var user_model_1 = require("./user-model");
var city_enum_1 = __importDefault(require("./city-enum"));
//2. Model Schema describing validation, constraints and more:
var OrderSchema = new mongoose_1.Schema({
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
        enum: city_enum_1.default
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
    userId: mongoose_1.Schema.Types.ObjectId,
    cartId: mongoose_1.Schema.Types.ObjectId
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
});
//Virtual Fields: 
OrderSchema.virtual('user', {
    ref: user_model_1.UserModel,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});
//Virtual Fields: 
OrderSchema.virtual('cart', {
    ref: cart_model_1.CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true
});
//3. Model Class - this is the final model class:
exports.OrderModel = (0, mongoose_1.model)('OrderModel', OrderSchema, 'orders');
