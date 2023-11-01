import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";
import crypto from "crypto";

const userSchema = new Schema(
  {
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
        message: "Invalid email address",
      },
    },
    userPassword: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value),
        message: "Password must contain at least one letter and one number",
      },
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
      default: false,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    userVerifyAt: {
      type: String,
    },
    userVerifyResetToken: {
      type: String,
    },
    userVerifyResetExpires: {
      type: String,
    },
    userPasswordChangedAt: {
      type: String,
    },
    userPasswordResetToken: {
      type: String,
    },
    userPasswordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  createPasswordChangedToken: function () {
    const randomBytes = crypto.randomBytes(3);
    const randomValue = parseInt(randomBytes.toString('hex'), 16) % 1000000;
    this.userPasswordResetToken =  randomValue.toString(),
    this.userPasswordResetExpires = Date.now() + 15 * 60 * 60 * 1000;
    console.log(randomValue);
    return randomValue.toString();
  },
  createVerifyToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.userVerifyResetToken = crypto.createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.userVerifyResetExpires = Date.now() + 15 * 60 * 60 * 1000;
    return resetToken;
  },
};


export default mongoose.model("User", userSchema);
