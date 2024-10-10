import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const updateCartController: RequestHandler = async (req, res) => {
  const { cartId, qty } = req.body;

  try {
    const updatedCart = await cartModel.findByIdAndUpdate(
      cartId,
      {
        quantity: qty,
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        message: "cart not found",
      });
    }

    return res.status(200).json({
      message: "Cart updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
