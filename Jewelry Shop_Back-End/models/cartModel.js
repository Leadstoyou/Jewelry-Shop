import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
    "Cart",
    new Schema(
        {
          cart_token: {
            type: String,
            required: true,
          },
              user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
              },
              productList: [{
                product_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                },
                size: {
                  type: [String],
                },
                color: {
                  type: [String],
                },
                material: {
                  type: [String],
                },
                quantity: {
                  type: Number,
                  validate:{
                    validator: (value) => value > 0 ,
                    message: 'Quantity must be greate than 0'
                }
                },
                price: {
                  type: Number,
                  validate:{
                    validator: (value) => value > 0 ,
                    message: 'Price must be greate than 0'
                }
                },
                productDescription: {
                  type: String,
                  validate: {
                    validator: (value) => validator.isLength(value, { min: 0, max: 5000 }),
                    message: "productDescription must be between 0 and 5000 characters",
                  },
                },
                productImage: {
                  type: String,
                  validate: {
                    validator: validator.isURL,
                    message: "Invalid URL for product image",
                  },
                },
              }],
              total: {
                type: Number,
                required: true
              },
              isCheckOut: {
                type: Boolean,
                default: false
              }
        },
        {
            timestamps: true,
        }
    )
);