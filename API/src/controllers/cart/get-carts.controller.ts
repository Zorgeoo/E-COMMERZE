import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const getCartsController: RequestHandler = async (req, res) => {
  const id = Object.keys(req.query)[0];
  console.log(id);
  try {
    const carts = await cartModel.find({ userId: id }).populate("Product");
    return res.status(201).json({
      carts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
