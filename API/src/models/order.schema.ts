import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OrderProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: false },
});

const OrderSchema = new Schema({
  products: { type: [OrderProductSchema], required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, required: true, default: "Ordered" },
  lastName: { type: String, required: false },
  firstName: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  addInfo: { type: String, required: false },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const OrderModel = model("Order", OrderSchema);
