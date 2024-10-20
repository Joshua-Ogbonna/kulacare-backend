"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.getDbConnection = exports.isDbConnected = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const DB_PASSWORD = process.env.MONGODB_PASSWORD;
const DB_USERNAME = process.env.MONGODB_USERNAME;
const DB_NAME = process.env.DB_NAME;
if (!DB_PASSWORD) {
    console.log("DB_PASSWORD environment is not set");
    process.exit(1);
}
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.uoa3z.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log(`Connected to MongoDB Atlas ${MONGODB_URI}`);
        mongoose_1.default.connection.on("error", (err) => {
            console.log(`MongoDB connection error: ${err}`);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
        process.on("SIGINT", async () => {
            await mongoose_1.default.connection.close();
            console.log("MongoDB connection closed through app termination");
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};
exports.connectDB = connectDB;
// Check if connection is ready
const isDbConnected = () => {
    return mongoose_1.default.connection.readyState === 1;
};
exports.isDbConnected = isDbConnected;
// Get mongoDB connection
const getDbConnection = () => {
    return mongoose_1.default.connection;
};
exports.getDbConnection = getDbConnection;
