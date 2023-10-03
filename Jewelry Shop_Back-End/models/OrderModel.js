import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
    "Order",
    new Schema(
        {
            customer_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              },
              order_date: {
                type: Date,
                required: true
              },
              total_amount: {
                type: String,
                required: true
              },
              status: {
                type: String,
                enum: {
                    values: ['Đã thanh toán', "Chưa thanh toán"],
                    message: '{VALUE} is not suppoted'
                },
                required: true
              }
        },
        {
            timestamps: true,
        }
    )
);