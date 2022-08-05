"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var salt = "MakeThingsGoRight";
var secretKey = 'KittensAreCute';
function hash(plainText) {
    if (!plainText)
        return null;
    var hashedText = crypto_1.default.createHmac('sha512', salt).update(plainText).digest('hex');
    return hashedText;
}
function getNewToken(user) {
    var payload = { user: user };
    var token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '7d' });
    return token;
}
function verifyToken(authorizationHeader) {
    return new Promise(function (resolve, reject) {
        if (!authorizationHeader) {
            resolve(false);
            return;
        }
        // Extract the token ("Bearer given-token"):
        var token = authorizationHeader.split(' ')[1];
        if (!token) {
            resolve(false);
            return;
        }
        jsonwebtoken_1.default.verify(token, secretKey, function (err) {
            if (err) {
                resolve(false);
                return;
            }
            resolve(true);
        });
    });
}
function getUserFromToken(authorizationHeader) {
    var token = authorizationHeader.split(' ')[1];
    //Extract payload from the token
    var payload = jsonwebtoken_1.default.decode(token);
    //Extract user
    var user = payload.user;
    return user;
}
exports.default = {
    hash: hash,
    getNewToken: getNewToken,
    verifyToken: verifyToken,
    getUserFromToken: getUserFromToken
};
