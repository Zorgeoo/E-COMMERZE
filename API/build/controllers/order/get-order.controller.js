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
exports.getOrdersController = void 0;
const order_schema_1 = require("../../models/order.schema");
const getOrdersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, admin, status, dateFilter } = req.query;
        let query = {}; // Initialize an empty query object
        // If the admin is querying, set up the query accordingly
        if (admin) {
            if (status) {
                query.status = status; // Filter by status if provided
            }
        }
        else if (userId) {
            query.userId = userId; // Filter by userId if provided
        }
        if (dateFilter) {
            const now = new Date();
            let startDate;
            switch (dateFilter) {
                case "today":
                    startDate = new Date(now.setHours(0, 0, 0, 0));
                    query.createdAt = { $gte: startDate };
                    break;
                case "last7days":
                    startDate = new Date(now.setDate(now.getDate() - 7));
                    query.createdAt = { $gte: startDate };
                    break;
                case "lastMonth":
                    startDate = new Date(now.setMonth(now.getMonth() - 1));
                    query.createdAt = { $gte: startDate };
                    break;
                default:
                    break;
            }
        }
        // Retrieve orders based on the constructed query
        const orders = yield order_schema_1.OrderModel.find(query).populate("products.productId");
        return res.status(200).json({
            orders,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Order tataj chdsanguie" });
    }
});
exports.getOrdersController = getOrdersController;
