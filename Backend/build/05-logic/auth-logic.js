"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cyber_1 = __importDefault(require("../02-middleware/cyber"));
var error_model_1 = __importDefault(require("../03-models/error-model"));
var user_model_1 = require("./../03-models/user-model");
function checkValidEmailAndSSN(user) {
    return __awaiter(this, void 0, void 0, function () {
        var existsUsername, hashedSocialtoCheck, existsSocialSecurityNumber;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1.UserModel.findOne({ username: user.username }).exec()];
                case 1:
                    existsUsername = _a.sent();
                    if (existsUsername)
                        return [2 /*return*/, false
                            // Hash and salt social security number before comparing in query 
                        ];
                    hashedSocialtoCheck = cyber_1.default.hash(user.socialSecurityNumber);
                    return [4 /*yield*/, user_model_1.UserModel.findOne({ socialSecurityNumber: hashedSocialtoCheck }).exec()];
                case 2:
                    existsSocialSecurityNumber = _a.sent();
                    if (existsSocialSecurityNumber)
                        return [2 /*return*/, false
                            //Return true if both social security number and email are unique
                        ];
                    //Return true if both social security number and email are unique
                    return [2 /*return*/, true];
            }
        });
    });
}
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, existsUsername, hashedSocialtoCheck, existsSocialSecurityNumber, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = user.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    return [4 /*yield*/, user_model_1.UserModel.findOne({ username: user.username }).exec()];
                case 1:
                    existsUsername = _a.sent();
                    if (existsUsername)
                        throw new error_model_1.default(400, "Username ".concat(user.username, " is already taken. Please make sure that you are not registered already or please choose a different username"));
                    hashedSocialtoCheck = cyber_1.default.hash(user.socialSecurityNumber);
                    return [4 /*yield*/, user_model_1.UserModel.findOne({ socialSecurityNumber: hashedSocialtoCheck }).exec()];
                case 2:
                    existsSocialSecurityNumber = _a.sent();
                    if (existsSocialSecurityNumber)
                        throw new error_model_1.default(400, "Social Security Number you have entered already exists. Please make sure that you are not registered already or please try again");
                    //Hash and salt passwords:
                    user.password = cyber_1.default.hash(user.password);
                    //Hash and salt social security number because it is also sensitive data
                    user.socialSecurityNumber = cyber_1.default.hash(user.socialSecurityNumber);
                    return [4 /*yield*/, user.save()
                        //We dont want to return password or social security id back to user in token becasue these are sensitive data.
                    ];
                case 3:
                    _a.sent();
                    //We dont want to return password or social security id back to user in token becasue these are sensitive data.
                    user.password = undefined;
                    user.socialSecurityNumber = undefined;
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, users, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = credentials.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    // Hash and salt password before comparing in query 
                    credentials.password = cyber_1.default.hash(credentials.password);
                    return [4 /*yield*/, user_model_1.UserModel.find({ username: credentials.username, password: credentials.password }, { password: 0, socialSecurityNumber: 0 }).exec()];
                case 1:
                    users = _a.sent();
                    user = users[0];
                    if (!user)
                        throw new error_model_1.default(401, "Incorrect username or password");
                    token = cyber_1.default.getNewToken(user);
                    return [2 /*return*/, token];
            }
        });
    });
}
exports.default = {
    register: register,
    login: login,
    checkValidEmailAndSSN: checkValidEmailAndSSN
};
