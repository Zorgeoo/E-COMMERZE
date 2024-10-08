import { RequestHandler } from "express";
import { OrderModel } from "../../models/order.schema";
import { productModel } from "../../models/product.schema";

type Products = {
  productId: string;
  quantity: number;
  size: string;
};

export const createOrderController: RequestHandler = async (req, res) => {
  try {
    await OrderModel.create({
      ...req.body,
    });

    const updatePromises = req.body.products.map((product: Products) =>
      productModel.findByIdAndUpdate(
        product.productId,
        { $inc: { soldQty: product.quantity,
          stock: -product.quantity
        },
      },
        { new: true }
      )
    );

    // eniig todruulah
    await Promise.all(updatePromises);

    return res.status(201).json({
      message: "Order uuslee",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Order uussengui ee",
    });
  }
};
