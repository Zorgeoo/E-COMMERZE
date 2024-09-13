import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: { type: String, required: true },
  categoryId: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    required: false,
  },
  price: { type: Number, required: true, default: 10000 },
  qty: { type: Number, required: false },
  images: { type: [String], required: false },
  salePercent: { type: Number, required: false },
  description: { type: String, required: true, default: "Description" },
  reviewCount: { type: Number, required: false },
  averageRating: { type: Number, required: false },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const productModel = model("Product", productSchema);
