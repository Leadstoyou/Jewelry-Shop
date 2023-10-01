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
                  required: true
                }],
                quantity: {
                  type: Number,
                  required: true
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