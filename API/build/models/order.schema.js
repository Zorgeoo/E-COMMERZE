"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const OrderProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    size: { type: String, required: false },
});
const OrderSchema = new Schema({
    products: { type: [OrderProductSchema], required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, required: true, default: "Ordered" },
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    addInfo: { type: String, required: false },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.OrderModel = model("Order", OrderSchema);
