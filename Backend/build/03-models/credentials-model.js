"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsModel = void 0;
var mongoose_1 = require("mongoose");
//2. Model Schema describing validation, constraints and more:
var CredentialsSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Missing username"],
        minlength: [2, "Username too short"],
        maxlength: [100, "Username too long"],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "You have entered an invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "Password too short"],
        maxlength: [100, "Password too long"],
        trim: true,
    }
}, {
    versionKey: false,
});
//3. Model Class - this is the final model class:
exports.CredentialsModel = (0, mongoose_1.model)('CredentialsModel', CredentialsSchema, 'users');
