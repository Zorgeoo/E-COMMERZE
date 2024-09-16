import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { userRouter } from "./routes/user.router";
import { productRouter } from "./routes/product.router";
import { categoryRouter } from "./routes/category.router";
import { orderRouter } from "./routes/order.router";

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
