"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const chat_1 = require("./routes/chat");
const user_1 = require("./routes/user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 30299;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use("/api", chat_1.router);
app.use("/api", user_1.router);
const startServer = async () => {
    await (0, db_1.connectDB)();
    app.listen(port, () => {
        console.log(`Server is running on PORT http://localhost${port}`);
    });
};
startServer().catch(console.error);
