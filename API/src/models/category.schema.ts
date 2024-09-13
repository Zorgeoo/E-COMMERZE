import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
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

export const categoryModel = model("Category", categorySchema);
