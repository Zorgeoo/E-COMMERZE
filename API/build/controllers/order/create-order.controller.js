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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = void 0;
const order_schema_1 = require("../../models/order.schema");
const product_schema_1 = require("../../models/product.schema");
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_schema_1.OrderModel.create(Object.assign({}, req.body));
        const updatePromises = req.body.products.map((product) => product_schema_1.productModel.findByIdAndUpdate(product.productId, { $inc: { soldQty: product.quantity,
                stock: -product.quantity
            },
        }, { new: true }));
        // eniig todruulah
        yield Promise.all(updatePromises);
        return res.status(201).json({
            message: "Order uuslee",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Order uussengui ee",
        });
    }
});
exports.createOrderController = createOrderController;
