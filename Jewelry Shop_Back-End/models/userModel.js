import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";

export default mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    userName: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters",
      },
    },
    userEmail: {
      type: String,
      validate: {
        validator: (value) => isEmail(value),
        message: "Email must be at least 3 characters",
      },
    },
    userPassword: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    userGender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userAge: {
      type: Number,
      validate: {
        validator: (value) => value > 0,
        message: "Age must be greater than 0",
      },
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Invalid URL for product image",
      },
    },
    userRole: {
      type: Number,
      default: 2,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
  )
);
