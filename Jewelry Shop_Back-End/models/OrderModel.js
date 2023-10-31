import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import validator from "validator";

export default mongoose.model(
    "Order",
    new Schema(
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: false
              },
              userName: {
                type: String,
                required: false,
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
              userPhoneNumber: {
                type: String,
                required: false,
              },
              userAddress: {
                type: String,
                required: false,
              },
              userAvatar: {
                type: String,
                required: true,
                validate: {
                  validator: validator.isURL,
                  message: "Invalid URL for product image",
                },
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
              orderDate: {
                type: Date,
                required: true
              },
              totalAmount: {
                type: String,
                required: true
              },
              orderStatus: {
                type: String,
               
                required: true
              }
        },
        {
            timestamps: true,
        }
    )
);