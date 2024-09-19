import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const createUserController: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email davhtsaj bn" });
    }

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
