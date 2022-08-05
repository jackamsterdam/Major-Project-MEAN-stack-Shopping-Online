"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var user_model_1 = require("./user-model");
//2. Model Schema describing validation, constraints and more:
var CartSchema = new mongoose_1.Schema({
    userId: mongoose_1.Schema.Types.ObjectId,
    isClosed: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
});
//Virtual Fields: 
CartSchema.virtual('user', {
    ref: user_model_1.UserModel,
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});
//3. Model Class - this is the final model class:
exports.CartModel = (0, mongoose_1.model)('CartModel', CartSchema, 'carts');
