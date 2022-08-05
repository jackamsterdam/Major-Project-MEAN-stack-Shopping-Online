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
var verify_admin_1 = __importDefault(require("../02-middleware/verify-admin"));
var verify_logged_in_1 = __importDefault(require("../02-middleware/verify-logged-in"));
var product_model_1 = require("../03-models/product-model");
var products_logic_1 = __importDefault(require("../05-logic/products-logic"));
var router = express_1.default.Router();
//http://localhost:3001/api/categories/
router.get('/categories', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products_logic_1.default.getAllCategories()];
            case 1:
                categories = _a.sent();
                response.json(categories);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//http://localhost:3001/api/products/
router.get('/products', verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products_logic_1.default.getAllProducts()];
            case 1:
                products = _a.sent();
                response.json(products);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Count:  non-users have access to this information.
//http://localhost:3001/api/products-count/
router.get('/products-count', function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var count, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products_logic_1.default.countProducts()];
            case 1:
                count = _a.sent();
                response.json(count);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//http://localhost:3001/api/products/234343232432
router.get("/products/:_id", verify_logged_in_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, product, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                _id = request.params._id;
                return [4 /*yield*/, products_logic_1.default.getOneProduct(_id)];
            case 1:
                product = _a.sent();
                response.json(product);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//http://localhost:3001/api/products/
router.post('/products', verify_admin_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product, addedProduct, err_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                product = new product_model_1.ProductModel(request.body);
                return [4 /*yield*/, products_logic_1.default.addProduct(product)];
            case 1:
                addedProduct = _b.sent();
                response.status(201).json(addedProduct);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//http://localhost:3001/api/products/62969ee1c05d55310aba99b2
router.put('/products/:_id', verify_admin_1.default, function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, product, updatedProduct, err_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                request.body.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
                _id = request.params._id;
                request.body._id = _id;
                product = new product_model_1.ProductModel(request.body);
                return [4 /*yield*/, products_logic_1.default.updateProduct(product)];
            case 1:
                updatedProduct = _b.sent();
                response.json(updatedProduct);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _b.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
