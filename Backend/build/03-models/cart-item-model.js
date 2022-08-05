"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModel = void 0;
var mongoose_1 = require("mongoose");
var cart_model_1 = require("./cart-model");
var product_model_1 = require("./product-model");
//2. Model Schema describing validation, constraints and more:
var CartItemSchema = new mongoose_1.Schema({
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
    productId: mongoose_1.Schema.Types.ObjectId,
    cartId: mongoose_1.Schema.Types.ObjectId
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});
//Virtual Fields: 
CartItemSchema.virtual('product', {
    ref: product_model_1.ProductModel,
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});
//Virtual Fields: 
CartItemSchema.virtual('cart', {
    ref: cart_model_1.CartModel,
    localField: 'cartId',
    foreignField: '_id',
    justOne: true
});
//3. Model Class - this is the final model class:
exports.CartItemModel = (0, mongoose_1.model)('CartItemModel', CartItemSchema, 'items');
