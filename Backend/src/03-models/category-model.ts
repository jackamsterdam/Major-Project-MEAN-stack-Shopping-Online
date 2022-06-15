import { Document, model, Schema } from "mongoose";

//1. Interface describing category:
export interface ICategoryModel extends Document {
    name: string
    description: string
}

//2. Schema describing category:
const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [200, "Description too long"],
        trim: true
    }
}, {
    versionKey: false
})

// 3. Category Model:
export const CategoryModel = model<ICategoryModel>('CategoryModel', CategorySchema, 'categories')