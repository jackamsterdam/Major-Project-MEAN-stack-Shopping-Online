import { Document, model, Schema } from "mongoose";
import CityEnum from "./city-enum";
import RoleEnum from "./role-enum";

//1. Model interface describing the data in the model:
export interface IUserModel extends Document {
    name: string
    lastName: string
    username: string
    password: string
    street: string
    city: CityEnum  // City Enum 10 most popular cities
    role: RoleEnum  // 1 = User , 2 = Admin  Admin does not have street and city btw but uses same model.
}

//2. Model Schema describing validation, constraints and more:
const UserSchema = new Schema<IUserModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true,

    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "Last name too short"],
        maxlength: [100, "Last name too long"],
        trim: true,

    },
    username: {
        type: String,
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "Password too short"],
        maxlength: [100, "Password too long"],
        trim: true,
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "Street too short"],
        maxlength: [100, "Street too long"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "Missing city"],
        enum: CityEnum,
        minlength: [2, "City too short"],
        maxlength: [100, "City too long"],
    },
    role: {
        type: Number,
        required: [true, "Missing role"],
        enum: RoleEnum,
        default: RoleEnum.User,
        min: [0, "Role can't be negative"],
        max: [1, "Role can't exceed 1"]
    }
}, {
    versionKey: false,
})


//3. Model Class - this is the final model class:
export const UserModel = model<IUserModel>('UserModel', UserSchema, 'users')