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
exports.updateUserController = void 0;
const user_schema_1 = require("../../models/user.schema");
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, updatedLastName, updatedFirstName, updatePhoneNumber, updatedAddress, updatedEmail, } = req.body;
    console.log(req.body);
    try {
        const updatedUser = yield user_schema_1.userModel.findByIdAndUpdate(userId, {
            username: updatedFirstName,
            lastName: updatedLastName,
            phoneNumber: updatePhoneNumber,
            address: updatedAddress,
            email: updatedEmail,
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                message: "user not found",
            });
        }
        return res.status(200).json({
            message: "User updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal serverrr error",
        });
    }
});
exports.updateUserController = updateUserController;
