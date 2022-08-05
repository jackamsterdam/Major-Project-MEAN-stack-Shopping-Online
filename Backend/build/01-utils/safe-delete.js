"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function safeDelete(fullPath) {
    try {
        if (!fullPath || !fs_1.default.existsSync(fullPath))
            return;
        fs_1.default.unlinkSync(fullPath);
    }
    catch (err) {
        //no need to display anything
    }
}
exports.default = safeDelete;
