"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default; //Mongoose-s Schema-g oruulj ireed table uusgene.
const userSchema = new Schema({
    username: { type: String, required: true }, //Field bolgon typetai bh ystoi, mun zaaval required esehiig ni todorhoilj uguh ystoi.
    lastName: { type: String, required: false, default: "Temuujin" },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, default: "91112892" },
    password: { type: String, required: true },
    address: { type: String, required: true, default: "UB city" },
    role: { type: String, required: true, default: "Customer" },
    liked: { type: [Schema.Types.ObjectId], ref: "Product", required: false }, //ObjectId maani mongoDB-n ugj bga _id gsn ug. ref: "Product", ene ni Product gsn modeliin _id-g avj hadgalnaa gsn ug.
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.userModel = model("User", userSchema);
