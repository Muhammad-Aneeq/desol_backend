import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import carRoutes from "./routes/carRoute.js";

mongoose.set("strictQuery", false);

const app = express();
dotenv.config();

const DB = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

// Middlewares
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*", // Modify this in production to restrict specific origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// Test route
app.use("/", (req, res) => {
  res.send("Hi from the express server");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
