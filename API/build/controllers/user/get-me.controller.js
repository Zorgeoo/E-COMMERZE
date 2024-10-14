"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = void 0;
const user_schema_1 = require("../../models/user.schema");
const getMeController = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
      const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = yield user_schema_1.userModel
        .findById(userId)
        .populate("liked");
      if (!user) return res.status(404).json({ message: "User not found" });
      const userData = {
        id: user._id,
        username: user.username,
        lastName: user.lastName,
        email: user.email,
        liked: user.liked,
        address: user.address,
        phoneNumber: user.phoneNumber,
      };
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
exports.getMeController = getMeController;
