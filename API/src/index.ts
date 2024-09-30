import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectToDatabase } from "./database";
import { userRouter } from "./routes/user.router";
import { productRouter } from "./routes/product.router";
import { categoryRouter } from "./routes/category.router";
import { orderRouter } from "./routes/order.router";
import { reviewRouter } from "./routes/review.router";
import { authRouter } from "./routes/auth.route";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/auth.middleware";
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

app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004");
});
