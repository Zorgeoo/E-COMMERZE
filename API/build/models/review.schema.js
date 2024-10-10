"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: false },
    // userId: { type: String, required: true },
    comment: { type: String, required: false },
    rating: { type: Number, required: true, default: 5 },
});
exports.ReviewModel = (0, mongoose_1.model)("Review", reviewSchema);
