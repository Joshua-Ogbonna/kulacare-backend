import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./db";
import { router as chatRouter } from "./routes/chat";
import { router as authRoutes } from "./routes/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 30299;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}))

app.use("/api", chatRouter);
app.use("/api", authRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on PORT http://localhost${port}`);
  });
};

startServer().catch(console.error);
