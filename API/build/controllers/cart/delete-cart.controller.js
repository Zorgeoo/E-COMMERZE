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
exports.deleteCartController = void 0;
const cart_schema_1 = require("../../models/cart.schema");
const deleteCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId, userId } = req.query;
        console.log("ustgah", cartId, userId);
        if (!cartId && userId) {
            yield cart_schema_1.cartModel.deleteMany({ userId });
            return res.status(200).json({
                message: "Cart has been cleared",
            });
        }
        const deletedCart = yield cart_schema_1.cartModel.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }
        return res.status(200).json({
            message: "Cart product deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server errorrr",
        });
    }
});
exports.deleteCartController = deleteCartController;
