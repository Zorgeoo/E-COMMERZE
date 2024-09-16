import { RequestHandler } from "express";
import { ReviewModel } from "../../models/review.schema";

export const getReviewController: RequestHandler=async(req,res)=>{
    try{const reviews=await ReviewModel.find({}).populate("userId").populate("productId")}
    return res.status(200).json({
        products,
      });
}
