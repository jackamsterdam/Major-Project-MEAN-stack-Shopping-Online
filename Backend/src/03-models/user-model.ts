import { Document, model, Schema } from "mongoose";
import CityEnum from "./city-enum";
import RoleEnum from "./role-enum";

//1. Model interface describing the data in the model:
export interface IUserModel extends Document {
    firstName: string
    lastName: string
    username: string
    password: string
    socialSecurityNumber: string
    street: string
    city: CityEnum  // City Enum 10 most popular cities
    role: RoleEnum  // 1 = User , 2 = Admin  Admin does not have street and city, but uses same model.
}

//2. Model Schema describing validation, constraints and more:
const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "Missing  first name"],
        minlength: [2, "First name too short"],
        maxlength: [100, "First name too long"],
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
        //uniqueness is checked in auth logic
        type: String,
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        trim: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, "You have entered an invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "Password too short"],
        maxlength: [128, "Password too long"],
        trim: true
    },
    socialSecurityNumber: {
        //uniqueness is checked in auth logic
        type: String,
        required: [true, "Missing SSN"],
        minlength: [11, "SSN too short"],
        maxlength: [128, "SSN too long"],  //SSN is hashed -but frontend should enter a 9 digit number with dashes
        trim: true,
        unique: true
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