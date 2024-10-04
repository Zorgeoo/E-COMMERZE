import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { userRouter } from "./routes/user.router";
import { productRouter } from "./routes/product.router";
import { categoryRouter } from "./routes/category.router";
import { orderRouter } from "./routes/order.router";
import { reviewRouter } from "./routes/review.router";
import { authRouter } from "./routes/auth.route";
import { upload } from "./config/multer";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware";
import { cartRouter } from "./routes/cart.route";
import { createCloudinaryController } from "./controllers/cloudinary/create-cloudinary.controller";
dotenv.config();

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});
app.use(authMiddleware);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/upload", upload.single("image"), createCloudinaryController);

app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004");
});
