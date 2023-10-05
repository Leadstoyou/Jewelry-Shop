import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
  "Product",
  new Schema(
    {
      id: { type: ObjectId },
      productName: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) => validator.isLength(value, { min: 2, max: 200 }),
          message: "productName must be between 2 and 200 characters",
        },
      },
      productDescription: {
        type: String,
        required: true,
        validate: {
          validator: (value) =>
            validator.isLength(value, { min: 0, max: 5000 }),
          message: "productDescription must be between 0 and 5000 characters",
        },
      },
      productQuantity: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => validator.isInt(String(value)),
          message: "productQuantity must be an integer",
        },
      },
      productPrice: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => validator.isFloat(String(value)),
          message: "productPrice must be a floating-point number",
        },
      },
      productColors: {
        type: [String],
        required: true,
        validate: {
          validator: (value) =>
            value.every((color) =>
              validator.isLength(color, { min: 1, max: 20 })
            ),
          message: "Each product color must be between 1 and 20 characters",
        },
      },
      productSizes: {
        type: [String],
        required: true,
        validate: {
          validator: (value) =>
            value.every((size) =>
              validator.isLength(size, { min: 1, max: 10 })
            ),
          message: "Each product size must be between 1 and 10 characters",
        },
      },
      productMaterials: {
        type: [String],
        required: true,
        validate: {
          validator: (value) =>
            value.every((material) =>
              validator.isLength(material, { min: 1, max: 20 })
            ),
          message: "Each product material must be between 1 and 20 characters",
        },
      },
      productCategory: {
        type: String,
        required: true,
        enum: ["Dây Chuyền", "Vòng", "Hoa Tai", "Charm"],
        validate: {
          validator: (value) => validator.isLength(value, { min: 2, max: 20 }),
          message: "productCategory must be between 2 and 20 characters",
        },
      },
      productDiscount: {
        type: Number,
        validate: {
          validator: (value) =>
            validator.isFloat(String(value), { min: 0, max: 100 }),
          message: "productDiscount must be a number between 0 and 100",
        },
      },
      productImage: {
        type: String,
        required: true,
        validate: {
          validator: validator.isURL,
          message: "Invalid URL for product image",
        },
      },
      isDeleted: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  )
);
