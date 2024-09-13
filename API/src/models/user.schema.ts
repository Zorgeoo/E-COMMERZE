import mongoose from "mongoose";
const { Schema, model } = mongoose; //Mongoose-s Schema-g oruulj ireed table uusgene.

const userSchema = new Schema({
  username: { type: String, required: true }, //Field bolgon typetai bh ystoi, mun zaaval required esehiig ni todorhoilj uguh ystoi.
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, default: "91112892" },
  password: { type: String, required: true, default: "1243ab" },
  address: { type: String, required: true, default: "UB city" },
  role: { type: String, required: true, default: "Customer" },
  products: { type: [Schema.Types.ObjectId], ref: "Product", required: false }, //ObjectId maani mongoDB-n ugj bga _id gsn ug. ref: "Product", ene ni Product gsn modeliin _id-g avj hadgalnaa gsn ug.
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

export const userModel = model("User", userSchema);
