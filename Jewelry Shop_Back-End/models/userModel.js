import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";
import crypto from "crypto";
import bcrypt from 'bcrypt';

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
    refreshToken: {
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
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.userPasswordResetToken = crypto.createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.userPasswordResetExpires = Date.now() + 15 * 60 * 60 * 1000;
    return resetToken;
  },
};
userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(
      this.userPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    this.userPassword = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", userSchema);
