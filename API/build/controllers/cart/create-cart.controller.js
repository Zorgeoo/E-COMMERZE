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
exports.createCartController = void 0;
const cart_schema_1 = require("../../models/cart.schema");
const createCartController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { size, quantity, cartProducts, userId } = req.body;
        console.log(cartProducts);
        const existingProduct = yield cart_schema_1.cartModel.findOneAndUpdate({ cartProducts: cartProducts }, {
            $inc: { quantity: quantity },
        }, { new: true });
        console.log("existing product", existingProduct);
        if (existingProduct) {
            return res.status(201).json({
                message: "Product quantity has been updated",
                product: existingProduct,
            });
        }
        const newCartProduct = yield cart_schema_1.cartModel.create(Object.assign({}, req.body));
        return res.status(201).json({
            message: "Cart product created successfully",
            product: newCartProduct,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server errorrr",
        });
    }
});
exports.createCartController = createCartController;
