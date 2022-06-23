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
    role: RoleEnum  // 1 = User , 2 = Admin  Admin does not have street and city btw but uses same model.
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
        type: String,
        // unique:  true,  //!gives ugly message so I made a funciotn in auth logic instead cause this is ugly message:  E11000 duplicate key error collection: ShoppingOnlineDB.users index: username_1 dup key: { username: "kermit@gmail.com"
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        trim: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "You have entered an invalid email address"],  //Btw frontend should prevent this message and have its own invalid email message. But if use enters email that already exists I handled that with a mice message in auth logic instaed of using unique here 
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "Password too short"],
        maxlength: [128, "Password too long"], //! //מיותר בגלל שהססמא תמיד תהיה האשד ???
        trim: true,
    },
    socialSecurityNumber: {
        type: String,
        required: [true, "Missing SSN"],
        minlength: [11, "SSN too short"],
        maxlength: [128, "SSN too long"],  //because SSN is hashed -but frontend should enter a 9 digit number
        //   match: [/^\d{3}-\d{2}-\d{4}$/, "SSN must be in the following number format: xxx-xx-xxxx"],    //!There is no way for me to validate the id is a number casue i hash it !! 
        // i wanted to check this: UserModel validation failed: socialSecurityNumber: SSN must be in the following number format: xxx-xx-xxxx  BUT I cant cause it hashed!! 
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
        required: [true, "Missing role"],   //!wait this should be not required maybe ???
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