import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsController: RequestHandler = async (req, res) => {
  try {
    const { categoryId, sizes, page, limit } = req.query;

    let query: any = {};

    if (!page && !limit) {
      const products = await productModel.find({});
      return res.status(200).json({ products });
    }

    if (categoryId) {
      query.categoryId = categoryId ? { $in: categoryId } : categoryId;
    }

    if (sizes) {
      query.sizes = sizes ? { $in: sizes } : sizes;
    }

    const products = await productModel
      .find(query)
      .limit(Number(limit) ? Number(limit) : 6)
      .skip((Number(page) - 1) * 6);

    const totalCount = await productModel.countDocuments(query);

    return res.status(200).json({ products, totalCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
