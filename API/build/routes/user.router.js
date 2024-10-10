"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const get_me_controller_1 = require("../controllers/user/get-me.controller");
const user_likedProduct_controller_1 = require("../controllers/user/user-likedProduct.controller");
const update_user_controller_1 = require("../controllers/user/update-user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter
    .get("/", user_1.getUsersController)
    // .get("/:id", getUserByIdController)
    .get("/me", get_me_controller_1.getMeController)
    .post("/liked", user_likedProduct_controller_1.handleLikedProducts)
    .put("/update", update_user_controller_1.updateUserController);
