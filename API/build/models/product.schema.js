"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
    productName: { type: String, required: true },
    categoryId: {
        type: [Schema.Types.ObjectId],
        ref: "Category",
        required: false,
    },
    price: { type: Number, required: true, default: 10000 },
    qty: { type: Number, required: false },
    images: { type: [String], required: false },
    sizes: { type: [String], required: false },
    salePercent: { type: Number, required: false },
    description: { type: String, required: false, default: "Description" },
    reviewCount: { type: Number, required: false, default: 0 },
    soldQty: { type: Number, required: false, default: 0 },
    averageRating: { type: Number, required: false, default: 0 },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.productModel = model("Product", productSchema);
