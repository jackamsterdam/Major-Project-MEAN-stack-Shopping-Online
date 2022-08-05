"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var mongoose_1 = require("mongoose");
var category_model_1 = require("./category-model");
//2. Model Schema describing validation, constraints and more:
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    imageName: {
        type: String,
    },
    image: {
        type: Object,
    },
    categoryId: mongoose_1.Schema.Types.ObjectId
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});
//Virtual Fields: 
ProductSchema.virtual('category', {
    ref: category_model_1.CategoryModel,
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true
});
//3. Model Class - this is the final model class:
exports.ProductModel = (0, mongoose_1.model)('ProductModel', ProductSchema, 'products');
