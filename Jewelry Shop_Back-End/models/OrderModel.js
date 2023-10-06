import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

export default mongoose.model(
    "Order",
    new Schema(
        {
            customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              },
              orderDate: {
                type: Date,
                required: true
              },
              totalAmount: {
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