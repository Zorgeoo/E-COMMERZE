import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const getUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
