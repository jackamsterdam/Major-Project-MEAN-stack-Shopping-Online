"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
//2. Schema describing category:
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
});
// 3. Category Model:
exports.CategoryModel = (0, mongoose_1.model)('CategoryModel', CategorySchema, 'categories');
