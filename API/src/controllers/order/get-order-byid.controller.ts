import { RequestHandler } from "express";
import { OrderModel } from "../../models/order.schema";

export const getOrderByIdController: RequestHandler = async (req, res) => {
  const { orderID } = req.params;

  try {
    const order = await OrderModel.findById(orderID).populate(
      "products.productId"
    );

    if (!order) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    return res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
