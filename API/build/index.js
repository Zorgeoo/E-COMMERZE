"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const user_router_1 = require("./routes/user.router");
const product_router_1 = require("./routes/product.router");
const category_router_1 = require("./routes/category.router");
const order_router_1 = require("./routes/order.router");
const review_router_1 = require("./routes/review.router");
const auth_route_1 = require("./routes/auth.route");
const multer_1 = require("./config/multer");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const cart_route_1 = require("./routes/cart.route");
const create_cloudinary_controller_1 = require("./controllers/cloudinary/create-cloudinary.controller");
dotenv_1.default.config();
(0, database_1.connectToDatabase)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.json({ message: "Hello World" });
});
app.use(auth_middleware_1.authMiddleware);
app.use("/user", user_router_1.userRouter);
app.use("/product", product_router_1.productRouter);
app.use("/category", category_router_1.categoryRouter);
app.use("/order", order_router_1.orderRouter);
app.use("/review", review_router_1.reviewRouter);
app.use("/auth", auth_route_1.authRouter);
app.use("/cart", cart_route_1.cartRouter);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
app.post("/upload", multer_1.upload.single("image"), create_cloudinary_controller_1.createCloudinaryController);
app.listen(3004, () => {
    console.log("Server is running on http://localhost:3004");
});
