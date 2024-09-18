import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  productId: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, required: true, default: "Shipped" },
});

export const OrderModel = model("Order", OrderSchema);
