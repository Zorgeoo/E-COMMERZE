import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params; //Params-s id hesgiig ni avna. //REQ: http://localhost:3001/user/66e3a551a0c6d3d6477bcb65 id-g ni avahdaa : 66e3a551a0c6d3d6477bcb65

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
