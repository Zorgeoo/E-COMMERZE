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
exports.updateCartController = void 0;
const cart_schema_1 = require("../../models/cart.schema");
const updateCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, qty } = req.body;
    try {
        const updatedCart = yield cart_schema_1.cartModel.findByIdAndUpdate(cartId, {
            quantity: qty,
        }, { new: true });
        if (!updatedCart) {
            return res.status(404).json({
                message: "cart not found",
            });
        }
        return res.status(200).json({
            message: "Cart updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal serverrr error",
        });
    }
});
exports.updateCartController = updateCartController;
