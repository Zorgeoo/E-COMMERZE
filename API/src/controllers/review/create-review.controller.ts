import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";
import { productModel } from "../../models/product.schema";

export const createReviewController: RequestHandler = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.productId);
    const { productId } = req.body;
    await ReviewModel.create({ ...req.body });

    if (!product) return;

    await productModel.findOneAndUpdate(
      { _id: req.body.productId },
      { $inc: { reviewCount: 1 } },
      { new: true }
    );

    const reviews = await ReviewModel.find({ productId });
    const validReviews = reviews.filter((review) => review.rating != null);
    const totalRating = validReviews.reduce(
      (acc, review) => acc + review.rating!,
      0
    );
    const averageRating =
      validReviews.length > 0 ? totalRating / validReviews.length : 0;

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      { averageRating: averageRating },
      { new: true }
    );
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
