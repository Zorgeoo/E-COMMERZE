import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const createProductController: RequestHandler = async (req, res) => {
  try {
    const { productName, price, categoryId } = req.body;

    await productModel.create({
      productName,
      price,
      categoryId,
    });

    return res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
