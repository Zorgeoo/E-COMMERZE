import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const createUserController: RequestHandler = async (req, res) => {
  try {
    const { username, email, products } = req.body; //Req-s table deer hadgalagdah fielduudee avna.

    await userModel.create({
      //User model schema deer username,email gsn fieldtei shine user nemeh uildel
      username,
      email,
      products,
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
