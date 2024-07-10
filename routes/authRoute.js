import express from "express";
import { register, login } from "../controllers/authController.js";
import cors from "cors";
const router = express.Router();

router.post("/register", cors(), register);
router.post("/login", cors(), login);

export default router;
