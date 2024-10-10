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
exports.getOrdersController = void 0;
const order_schema_1 = require("../../models/order.schema");
const getOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, admin, status } = req.query;
        if (admin && !status) {
            const orders = yield order_schema_1.OrderModel.find({}).populate("products.productId");
            return res.status(200).json({
                orders,
            });
        }
        if (admin && status) {
            const orders = yield order_schema_1.OrderModel.find({ status }).populate("products.productId");
            return res.status(200).json({
                orders,
            });
        }
        if (!admin || userId) {
            const orders = yield order_schema_1.OrderModel.find({ userId }).populate("products.productId");
            return res.status(200).json({
                orders,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Order tataj chdsanguie" });
    }
});
exports.getOrdersController = getOrdersController;
