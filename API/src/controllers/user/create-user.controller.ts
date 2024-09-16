import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const createUserController: RequestHandler = async (req, res) => {
  try {
    await userModel.create({
      //User model schema deer username,email gsn fieldtei shine user nemeh uildel
      ...req.body,
    });

    return res.status(201).json({
      message: "Author created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
