"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var striptags_1 = __importDefault(require("striptags"));
function sanitize(request, response, next) {
    for (var prop in request.body) {
        if (typeof request.body[prop] === 'string') {
            request.body[prop] = (0, striptags_1.default)(request.body[prop]);
        }
    }
    next();
}
exports.default = sanitize;
