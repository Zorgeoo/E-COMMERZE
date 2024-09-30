import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const createCartController: RequestHandler = async (req, res) => {
  try {
    const { size, quantity, cartProducts, userId } = req.body;
    await cartModel.create({
      ...req.body,
    });

    return res.status(201).json({
      message: "Cart product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
