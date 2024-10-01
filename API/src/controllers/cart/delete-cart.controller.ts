import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const deleteCartController: RequestHandler = async (req, res) => {
  try {
    const { cartId } = req.query;
    console.log("ustgah", cartId);

    const deletedCart = await cartModel.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    return res.status(200).json({
      message: "Cart product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
