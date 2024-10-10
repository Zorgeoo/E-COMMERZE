import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";

interface CustomRequest extends Request {
  user?: { id: string }; // Adjust this to match your user structure
}

export const getMeController = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await userModel.findById(userId).populate("liked");
    if (!user) return res.status(404).json({ message: "User not found" });

    const userData = {
      id: user._id,
      username: user.username,
      lastName: user.lastName,
      email: user.email,
      liked: user.liked,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
