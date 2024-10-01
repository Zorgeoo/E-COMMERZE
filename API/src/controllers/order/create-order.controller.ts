import { RequestHandler } from "express";
import { OrderModel } from "../../models/order.schema";

export const createOrderController: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);

    await OrderModel.create({
      ...req.body,
    });
    return res.status(201).json({
      message: "Order uuslee",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Order uussengui ee",
    });
  }
};
