import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);
