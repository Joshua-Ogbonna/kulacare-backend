import { Router } from "express";

import { createUser, generateCode } from "../controllers/authController";

export const router = Router();

router.post("/create-user", createUser);
router.post("/generate-code", generateCode);
