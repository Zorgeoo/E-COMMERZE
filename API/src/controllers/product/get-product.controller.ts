import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsController: RequestHandler = async (req, res) => {
  try {
    const { categoryId, sizes } = req.query;
    console.log(categoryId, sizes);

    let query: any = {};

    if (categoryId) {
      query.categoryId = categoryId ? { $in: categoryId } : categoryId;
    }

    if (sizes) {
      query.sizes = sizes ? { $in: sizes } : sizes;
    }

    const products = await productModel.find(query);
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
