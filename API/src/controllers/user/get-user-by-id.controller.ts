import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const getUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params; //Params-s id hesgiig ni avna. //REQ: http://localhost:3001/user/66e3a551a0c6d3d6477bcb65 id-g ni avahdaa : 66e3a551a0c6d3d6477bcb65

  try {
    const user = await userModel.findById(id).populate("liked"); //Usermodel-s tuhain id-tai tentseh user-g haina.
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrreeer error",
    });
  }
};
