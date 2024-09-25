import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const handleLikedProducts: RequestHandler = async (req, res) => {
  console.log(req.body);
  const { userId, productId } = req.body; //Req-s userId,productId-aa avna
  try {
    const user = await userModel.findById(userId); //UserId-tai taarah user-g hadgalna.
    if (!user) {
      return res.status(404).json({ message: "User not found" }); //Hervee bhgui bol return hiij duusgana
    }
    const alreadyLiked = user.liked?.includes(productId); //User oldson tohioldold user-n liked fielded tuhain productId bga eseh?

    if (alreadyLiked) {
      user.liked = user.liked?.filter((id) => id.toString() !== productId); //Hervee baival filterdeed tuhain array-s ustgana.
    } else {
      user.liked?.push(productId); //Tuhain productId bhgui baival user-n liked array-luu push hiine.
    }
    await user.save(); // Hiisen oorchloltoo hadgalj bgaa Mongoose-n function

    return res.status(200).json({
      message: alreadyLiked
        ? "Product removed from liked"
        : "Product added to liked",
      liked: user.liked,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
