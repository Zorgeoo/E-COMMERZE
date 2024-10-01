import { RequestHandler } from "express";
import { OrderModel } from "../../models/order.schema";

export const getOrdersController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;

    const orders = await OrderModel.find({ userId }).populate(
      "products.productId"
    );

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Order tataj chdsanguie" });
  }
};
