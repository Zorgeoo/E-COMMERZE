import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  cartProducts: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: false,
  },
  size: { type: String, required: false },
  quantity: { type: Number, required: false },
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

export const cartModel = model("Cart", cartSchema);
