import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const updateProductController: RequestHandler = async (req, res) => {
  const {
    updatedName,
    updatedPrice,
    productId,
    updatedCategory,
    updatedStock,
  } = req.body;

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        productName: updatedName,
        price: updatedPrice,
        categoryId: updatedCategory,
        stock: updatedStock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    return res.status(200).json({
      message: "Updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
