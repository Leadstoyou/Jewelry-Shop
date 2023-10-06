import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
    "Cart",
    new Schema(
        {
            cartToken: {
                type: String,
                required: true
              },
              user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
              },
              product_list: [{
                product_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
                },
                size: [{
                  type: String,
                  enum: {
                    values: ['S', "M", "L", "XL"],
                    message: '{VALUE} is not suppoted'
                },
                  required: true
                }],
                color: [{
                  type: String,
                  required: true
                }],
                material: [{
                  type: String,
                  required: true
                }],
                quantity: {
                  type: Number,
                  required: true,
                  validate:{
                    validator: (value) => value > 0 ,
                    message: 'Quantity must be greate than 0'
                }
                },
                price: {
                  type: Number,
                  required: true,
                  validate:{
                    validator: (value) => value > 0 ,
                    message: 'Price must be greate than 0'
                }
                }
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