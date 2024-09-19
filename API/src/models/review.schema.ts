import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  // userId: { type: String, required: true },
  comment: { type: String, required: false },
  rating: { type: Number, required: true, default: 5 },
});

export const ReviewModel = model("Review", reviewSchema);
