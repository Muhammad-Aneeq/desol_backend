import express from "express";
import { createCar } from "../controllers/carController.js";
import { verifyToken } from "../utils/verifyToken.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", verifyToken, upload.array("images"), createCar);

export default router;
