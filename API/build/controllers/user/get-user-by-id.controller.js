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
exports.getUserByIdController = void 0;
const user_schema_1 = require("../../models/user.schema");
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //Params-s id hesgiig ni avna. //REQ: http://localhost:3001/user/66e3a551a0c6d3d6477bcb65 id-g ni avahdaa : 66e3a551a0c6d3d6477bcb65
    try {
        const user = yield user_schema_1.userModel.findById(id).populate("liked"); //Usermodel-s tuhain id-tai tentseh user-g haina.
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal serverrreeer error",
        });
    }
});
exports.getUserByIdController = getUserByIdController;
