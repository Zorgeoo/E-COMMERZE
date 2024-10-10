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
exports.deleteProductController = void 0;
const product_schema_1 = require("../../models/product.schema");
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.query;
        console.log("ustgah", productId);
        const product = yield product_schema_1.productModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(200).json({
                message: "There is no product",
            });
        }
        return res
            .status(200)
            .json({ product, message: "Cart product deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server errorrr",
        });
    }
});
exports.deleteProductController = deleteProductController;
