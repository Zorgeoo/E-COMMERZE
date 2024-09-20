import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsController: RequestHandler = async (req, res) => {
  try {
    const { categoryId, sizes } = req.query;
    console.log(req.query);
    console.log(categoryId, sizes);

    let products;
    if (categoryId === "All" && sizes === "All") {
      products = await productModel.find({});
      return res.status(200).json({ products });
    }

    if (categoryId && sizes === "All") {
      products = await productModel.find({ categoryId: categoryId });
      return res.status(200).json({ products });
    }

    if (sizes && categoryId === "All") {
      products = await productModel.find({ sizes: sizes });
      return res.status(200).json({ products });
    }

    if (categoryId && sizes) {
      products = await productModel
        .find({ sizes: sizes })
        .find({ categoryId: categoryId });
      return res.status(200).json({ products });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
