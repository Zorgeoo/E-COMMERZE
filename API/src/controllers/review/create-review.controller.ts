import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";
import { productModel } from "../../models/product.schema";

export const createReviewController: RequestHandler = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);

    if (!product) return;

    await productModel.findOneAndUpdate(
      { _id: req.body.productId },
      { $inc: { reviewCount: 1 } },
      { new: true }
    );

    // const reviews = await ReviewModel.find({ productId });ç

    await ReviewModel.create({ ...req.body });
    return res.status(201).json({
      message: "Review created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Review uussengui",
    });
  }
};
