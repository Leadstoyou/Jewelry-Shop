import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

const discountSchema = new mongoose.Schema({
  discountId:  { type: ObjectId },
  discountName: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { max: 200 }),
      message: "Discount name must be at most 200 characters",
    },
  },
  discountDescription: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isLength(value, { max: 2000 }),
      message: "Discount description must be at most 2000 characters",
    },
  },
  discountStartDate: { type: Date, required: true },
  discountExpiredDate: { type: Date, required: true },
  discountPercentage: {
    type: Number,
    required: true,
    validate: {
      validator: (value) =>
        validator.isFloat(String(value), { min: 0, max: 100 }),
      message: "Discount percentage must be a number between 0 and 100",
    },
  },
  isActive: { type: Boolean, default: true },
  usageLimit: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => validator.isInt(String(value), { min: 1 }),
      message: "Usage limit must be a positive integer",
    },
  },
});

const productSchema = new Schema(
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
        validator: (value) => validator.isLength(value, { min: 0, max: 5000 }),
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
          value.every((size) => validator.isLength(size, { min: 1, max: 10 })),
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
      enum: ["Dây Chuyền", "Vòng", "Hoa Tai", "Charm","Nhẫn"],
      validate: {
        validator: (value) => validator.isLength(value, { min: 2, max: 20 }),
        message: "productCategory must be between 2 and 20 characters",
      },
    },
    productDiscount: {
      type: [discountSchema],
      required: false,
      validate: {
        validator: (discounts) =>
          discounts.every((discount) => {
            const validationResult = discount.validateSync();
            if (validationResult) {
              throw new Error(validationResult.errors.join(", "));
            }
            return true;
          }),
        message: "Invalid structure for productDiscount",
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
);

productSchema.statics.updateDiscountStatus = async function (productId) {
  const product = await this.findById(productId);
  if (product) {
    product.productDiscount.forEach((discount) => {
      if (discount.discountExpiredDate <= new Date()) {
        discount.isActive = false;
      }
    });
    await product.save();
  }
};

const Product = mongoose.model("Product", productSchema);

export default Product;
