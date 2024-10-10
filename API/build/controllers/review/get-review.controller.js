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
exports.getReviewController = void 0;
const review_schema_1 = require("../../models/review.schema");
const getReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_schema_1.ReviewModel.find({})
            .populate("userId")
            .populate("productId");
        return res.status(200).json({
            reviews,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Review orsonguiee",
        });
    }
});
exports.getReviewController = getReviewController;
