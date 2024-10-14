import { RequestHandler } from "express";
import { OrderModel } from "../../models/order.schema";

export const getOrdersController: RequestHandler = async (req, res) => {
  try {
    const { userId, admin, status, dateFilter } = req.query;

    let query: any = {}; // Initialize an empty query object

    // If the admin is querying, set up the query accordingly
    if (admin) {
      if (status) {
        query.status = status; // Filter by status if provided
      }
    } else if (userId) {
      query.userId = userId; // Filter by userId if provided
    }

    if (dateFilter) {
      const now = new Date();
      let startDate: Date;

      switch (dateFilter) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          query.createdAt = { $gte: startDate };
          break;
        case "last7days":
          startDate = new Date(now.setDate(now.getDate() - 7));
          query.createdAt = { $gte: startDate };
          break;
        case "lastMonth":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          query.createdAt = { $gte: startDate };
          break;
        default:
          break;
      }
    }

    // Retrieve orders based on the constructed query
    const orders = await OrderModel.find(query).populate("products.productId");

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Order tataj chdsanguie" });
  }
};
