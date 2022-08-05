"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../01-utils/config"));
var log_helper_1 = __importDefault(require("../01-utils/log-helper"));
var error_model_1 = __importDefault(require("../03-models/error-model"));
function errorsHandler(err, request, response, next) {
    if (err instanceof Error) {
        log_helper_1.default.error(err.message);
        var msg = config_1.default.isDevelopment ? err.message : 'Some error occured, please try again...';
        response.status(err.status || 500).send(msg);
        return;
    }
    if (err instanceof error_model_1.default) {
        log_helper_1.default.info(err.message);
        response.status(err.status).send(err.message); //(lax policy) to return 400 errors to front end
        return;
    }
}
exports.default = errorsHandler;
