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
exports.updateProductController = void 0;
const product_schema_1 = require("../../models/product.schema");
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updatedName, updatedPrice, productId, updatedCategory, updatedStock, } = req.body;
    try {
        const updatedProduct = yield product_schema_1.productModel.findByIdAndUpdate(productId, {
            productName: updatedName,
            price: updatedPrice,
            categoryId: updatedCategory,
            stock: updatedStock,
        }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                message: "product not found",
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
exports.updateProductController = updateProductController;
