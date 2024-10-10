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
exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    //Ene function mongoDB-tei holboj ugnu
    yield (0, mongoose_1.connect)("mongodb+srv://zjergsen:rkqUPLRTcpJlkBBU@cluster0.kbbcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected to database");
});
exports.connectToDatabase = connectToDatabase;
