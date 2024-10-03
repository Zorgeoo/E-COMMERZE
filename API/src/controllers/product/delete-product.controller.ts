import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const deleteProductController: RequestHandler = async (req, res) => {
  try {
    const { productId } = req.query;
    console.log("ustgah", productId);

    const product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(200).json({
        message: "There is no product",
      });
    }

    return res
      .status(200)
      .json({ product, message: "Cart product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
