import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const updateUserController: RequestHandler = async (req, res) => {
  const {
    userId,
    updatedLastName,
    updatedFirstName,
    updatePhoneNumber,
    updatedAddress,
    updatedEmail,
  } = req.body;
  console.log(req.body);

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        username: updatedFirstName,
        lastName: updatedLastName,
        phoneNumber: updatePhoneNumber,
        address: updatedAddress,
        email: updatedEmail,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
