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
exports.getReviewByProductId = void 0;
const review_schema_1 = require("../../models/review.schema");
const getReviewByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    console.log(req.params);
    try {
        const reviews = yield review_schema_1.ReviewModel.find({ productId }).populate("userId");
        if (!reviews) {
            res.status(404).json({ message: "No reviews" });
        }
        return res.json({ reviews });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getReviewByProductId = getReviewByProductId;
