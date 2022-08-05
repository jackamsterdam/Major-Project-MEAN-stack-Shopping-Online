"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var config_1 = __importDefault(require("./config"));
var logger = (0, winston_1.createLogger)({
    level: 'info',
    transports: [
        new winston_1.transports.File({ filename: config_1.default.logFile })
    ],
    format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY:MM:DD hh:mm:ss' }), winston_1.format.printf(function (log) { return "".concat(log.level, "\t").concat(log.timestamp, "\t").concat(log.message); }))
});
exports.default = logger;
