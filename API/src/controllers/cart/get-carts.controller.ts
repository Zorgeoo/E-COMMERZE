import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const getCartsController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    const carts = await cartModel.find({ userId }).populate("cartProducts");
    return res.status(201).json({
      carts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
