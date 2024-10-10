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
exports.getProductsController = void 0;
const product_schema_1 = require("../../models/product.schema");
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, sizes, page, limit } = req.query;
        let query = {};
        if (!page && !limit && !categoryId && !sizes) {
            const products = yield product_schema_1.productModel
                .find({})
                .populate("categoryId", { categoryName: 1 });
            return res.status(200).json({ products });
        }
        if (categoryId) {
            if (categoryId === "All") {
                const products = yield product_schema_1.productModel
                    .find({})
                    .populate("categoryId", { categoryName: 1 });
                return res.status(200).json({ products });
            }
            query.categoryId = categoryId ? { $in: categoryId } : categoryId;
        }
        if (sizes) {
            query.sizes = sizes ? { $in: sizes } : sizes;
        }
        const products = yield product_schema_1.productModel
            .find(query)
            .populate("categoryId", { categoryName: 1 })
            .limit(Number(limit) ? Number(limit) : 6)
            .skip((Number(page) - 1) * 6);
        const totalCount = yield product_schema_1.productModel.countDocuments(query);
        return res.status(200).json({ products, totalCount });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.getProductsController = getProductsController;
