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
var error_model_1 = __importDefault(require("../03-models/error-model"));
var cart_item_model_1 = require("../03-models/cart-item-model");
var carts_logic_1 = __importDefault(require("../05-logic/carts-logic"));
var cart_model_1 = require("../03-models/cart-model");
//This is how we fill up the left side of the cart when user re-logs in: 
function getAllItemsByCart(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, cart_item_model_1.CartItemModel.find({ cartId: cartId }).populate('cart').populate('product').exec()];
        });
    });
}
//User adds new item first time - cart is created and item added or
//  User adds new item to existing cart - item is added to cart or
//  User updates existing item in cart 
function addItem(item, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, newCart, found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = item.validateSync();
                    if (errors)
                        throw new error_model_1.default(400, errors.message);
                    if (!!item.cartId) return [3 /*break*/, 2];
                    return [4 /*yield*/, carts_logic_1.default.addCart(new cart_model_1.CartModel({ userId: userId, isClosed: false }))
                        // update the cart id with the new item
                    ];
                case 1:
                    newCart = _a.sent();
                    // update the cart id with the new item
                    item.cartId = newCart._id;
                    // Add new item to the cart
                    return [2 /*return*/, item.save()];
                case 2:
                    if (!item.cartId) return [3 /*break*/, 5];
                    // find the item in the cart and update the item
                    return [4 /*yield*/, cart_item_model_1.CartItemModel.updateOne({ cartId: item.cartId, productId: item.productId }, { $set: { quantity: item.quantity, total: item.total } }).exec()];
                case 3:
                    // find the item in the cart and update the item
                    _a.sent();
                    return [4 /*yield*/, cart_item_model_1.CartItemModel.findOne({ cartId: item.cartId, productId: item.productId }).exec()
                        // add item that does not exist in cart: 
                    ];
                case 4:
                    found = _a.sent();
                    // add item that does not exist in cart: 
                    if (!found) {
                        // Add new item to the cart
                        return [2 /*return*/, item.save()];
                    }
                    else {
                        return [2 /*return*/, found];
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
//Delete item - when user presses x on item on the cart :
// if you delete the item then that means the productID and the cartId gets deleted with it  
function deleteItem(productId, cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.deleteOne({ productId: productId, cartId: cartId }).exec()];
                case 1:
                    deletedItem = _a.sent();
                    if (!deletedItem)
                        throw new error_model_1.default(404, "Resource with productId ".concat(productId, " or cartId ").concat(cartId, " not found"));
                    return [2 /*return*/];
            }
        });
    });
}
// delete collection 
function deleteAllItemsByCart(cartId) {
    return __awaiter(this, void 0, void 0, function () {
        var deletedCartItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_item_model_1.CartItemModel.deleteMany({ cartId: cartId })];
                case 1:
                    deletedCartItems = _a.sent();
                    if (!deletedCartItems)
                        throw new error_model_1.default(404, "Resources with _id ".concat(cartId, " not found"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getAllItemsByCart: getAllItemsByCart,
    addItem: addItem,
    deleteItem: deleteItem,
    deleteAllItemsByCart: deleteAllItemsByCart
};
