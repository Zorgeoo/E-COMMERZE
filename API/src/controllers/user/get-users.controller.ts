import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const getUsersController: RequestHandler = async (req, res) => {
  try {
    const users = await userModel.find({}).populate("liked"); //({}) iim baival table-s buh user-g duudna. populate ni duurgej bga yg ymar mdeelel productaas avchrahaa shiidne

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
