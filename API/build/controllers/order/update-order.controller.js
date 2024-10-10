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
exports.updateOrderController = void 0;
const order_schema_1 = require("../../models/order.schema");
const updateOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, newStatus } = req.query;
    try {
        const updatedOrder = yield order_schema_1.OrderModel.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({
                message: "order not found",
            });
        }
        return res.status(200).json({
            message: "Updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal serverrr error",
        });
    }
});
exports.updateOrderController = updateOrderController;
