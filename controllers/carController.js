import Car from "../models/Car.js";
import cloudinary from "../utils/cloudinary.cjs";
import streamifier from "streamifier";

const cloudinaryImageUploadMethod = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const createCar = async (req, res, next) => {
  try {
    const { model, price, phone, city } = req.body;

    if (!req.files || req.files.length === 0) {
      return next(createError(400, "No files uploaded"));
    }
    const imageUrls = [];
    const files = req.files;
    for (const file of files) {
      const newPath = await cloudinaryImageUploadMethod(file.buffer);
      imageUrls.push(newPath);
    }

    const newCar = new Car({
      model,
      price,
      phone,
      city,
      images: imageUrls,
      user: req.user.id,
    });

    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
