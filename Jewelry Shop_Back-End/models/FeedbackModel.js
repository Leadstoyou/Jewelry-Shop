import mongoose, { Schema, ObjectId } from "mongoose";

const FeedbackSchema = new Schema(
  {
    id: { type: ObjectId },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    star: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("feedback", FeedbackSchema);
