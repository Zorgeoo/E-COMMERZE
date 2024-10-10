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
exports.createReviewController = void 0;
const review_schema_1 = require("../../models/review.schema");
const product_schema_1 = require("../../models/product.schema");
const createReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_schema_1.productModel.findById(req.body.productId);
        const { productId } = req.body;
        yield review_schema_1.ReviewModel.create(Object.assign({}, req.body));
        if (!product)
            return;
        yield product_schema_1.productModel.findOneAndUpdate({ _id: req.body.productId }, { $inc: { reviewCount: 1 } }, { new: true });
        const reviews = yield review_schema_1.ReviewModel.find({ productId });
        const validReviews = reviews.filter((review) => review.rating != null);
        const totalRating = validReviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = validReviews.length > 0 ? totalRating / validReviews.length : 0;
        const updatedProduct = yield product_schema_1.productModel.findOneAndUpdate({ _id: productId }, { averageRating: averageRating }, { new: true });
        return res.status(201).json({
            message: "Review created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Review uussengui",
        });
    }
});
exports.createReviewController = createReviewController;
