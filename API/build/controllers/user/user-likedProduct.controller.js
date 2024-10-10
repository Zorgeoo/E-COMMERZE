"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLikedProducts = void 0;
const user_schema_1 = require("../../models/user.schema");
const handleLikedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log(req.body);
    const { userId, productId } = req.body; //Req-s userId,productId-aa avna
    try {
        const user = yield user_schema_1.userModel.findById(userId); //UserId-tai taarah user-g hadgalna.
        if (!user) {
            return res.status(404).json({ message: "User not found" }); //Hervee bhgui bol return hiij duusgana
        }
        const alreadyLiked = (_a = user.liked) === null || _a === void 0 ? void 0 : _a.includes(productId); //User oldson tohioldold user-n liked fielded tuhain productId bga eseh?
        if (alreadyLiked) {
            user.liked = (_b = user.liked) === null || _b === void 0 ? void 0 : _b.filter((id) => id.toString() !== productId); //Hervee baival filterdeed tuhain array-s ustgana.
        }
        else {
            (_c = user.liked) === null || _c === void 0 ? void 0 : _c.push(productId); //Tuhain productId bhgui baival user-n liked array-luu push hiine.
        }
        yield user.save(); // Hiisen oorchloltoo hadgalj bgaa Mongoose-n function
        return res.status(200).json({
            message: alreadyLiked
                ? "Product removed from liked"
                : "Product added to liked",
            liked: user.liked,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.handleLikedProducts = handleLikedProducts;
