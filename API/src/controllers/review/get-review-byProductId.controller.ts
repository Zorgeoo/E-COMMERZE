import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";

export const getReviewByProductId: RequestHandler = async (req, res) => {
  const { productId } = req.params;
  console.log(req.params);

  try {
    const reviews = await ReviewModel.find({ productId }).populate("userId");

    if (!reviews) {
      res.status(404).json({ message: "No reviews" });
    }
    return res.json({ reviews });
  } catch (error) {
    console.log(error);
  }
};
