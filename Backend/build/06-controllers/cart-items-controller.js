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
var express_1 = __importDefault(require("express"));
var verify_logged_in_1 = __importDefault(require("../02-middleware/verify-logged-in"));
var cart_item_model_1 = require("../03-models/cart-item-model");
var cart_items_logic_1 = __importDefault(require("../05-logic/cart-items-logic"));
var router = express_1.default.Router();
//When user re-logs in his cart items are displayed
//http://localhost:3001/api/items-by-cart/62969ee1c05d55310aba99b2
router.get('/items-by-cart/:cartId', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, items, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = request.params.cartId;
                return [4 /*yield*/, cart_items_logic_1.default.getAllItemsByCart(cartId)];
            case 1:
                items = _a.sent();
                response.json(items);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Adding new item to cart with cart sent in body but sending userId as well in url
//http://localhost:3001/api/items/62ab04da04e42a63f933a30b
router.post('/items/:userId', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, item, addedItem, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = request.params.userId;
                item = new cart_item_model_1.CartItemModel(request.body);
                return [4 /*yield*/, cart_items_logic_1.default.addItem(item, userId)];
            case 1:
                addedItem = _a.sent();
                response.status(201).json(addedItem);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete one item in specific cart
//http://localhost:3001/api/items/:_id/cartId
router.delete('/items/:_id/:cartId', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, cartId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = request.params._id;
                cartId = request.params.cartId;
                return [4 /*yield*/, cart_items_logic_1.default.deleteItem(_id, cartId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Delete All items in specific cart
//http://localhost:3001/api/cartId
router.delete('/items/:cartId', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cartId, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                cartId = request.params.cartId;
                return [4 /*yield*/, cart_items_logic_1.default.deleteAllItemsByCart(cartId)];
            case 1:
                _a.sent();
                response.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
