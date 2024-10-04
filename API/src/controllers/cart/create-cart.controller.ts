import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";
import mongoose from "mongoose";

export const createCartController: RequestHandler = async (req, res) => {
  try {
    const { size, quantity, cartProducts, userId } = req.body;
    console.log(cartProducts);

    const existingProduct = await cartModel.findOneAndUpdate(
      { cartProducts: cartProducts },
      {
        $inc: { quantity: quantity },
      },
      { new: true }
    );

    console.log("existing product", existingProduct);

    if (existingProduct) {
      return res.status(201).json({
        message: "Product quantity has been updated",
        product: existingProduct,
      });
    }

    const newCartProduct = await cartModel.create({
      ...req.body,
    });

    return res.status(201).json({
      message: "Cart product created successfully",
      product: newCartProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
