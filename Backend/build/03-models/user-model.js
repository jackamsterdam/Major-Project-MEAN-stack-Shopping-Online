"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var city_enum_1 = __importDefault(require("./city-enum"));
var role_enum_1 = __importDefault(require("./role-enum"));
//2. Model Schema describing validation, constraints and more:
var UserSchema = new mongoose_1.Schema({
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
        maxlength: [128, "SSN too long"],
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
        enum: city_enum_1.default,
        minlength: [2, "City too short"],
        maxlength: [100, "City too long"],
    },
    role: {
        type: Number,
        required: [true, "Missing role"],
        enum: role_enum_1.default,
        default: role_enum_1.default.User,
        min: [0, "Role can't be negative"],
        max: [1, "Role can't exceed 1"]
    }
}, {
    versionKey: false,
});
//3. Model Class - this is the final model class:
exports.UserModel = (0, mongoose_1.model)('UserModel', UserSchema, 'users');
