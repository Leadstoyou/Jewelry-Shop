import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
    "OrderDetail",
    new Schema(
        {
            order_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
                required: true
              },
              productList: [{
                product_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
                },
                size: [{
                  type: String,
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
              rating: {
                type: Number,
                required: true
              },
              review: {
                type: String,
                required: true
              },
              image_review: {
                type: String,
                required: true
              }
        },
        {
            timestamps: true,
        }
    )
);