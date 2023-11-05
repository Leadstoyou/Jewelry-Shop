import Exception from "../constant/Exception.js";
import { Feedback } from "../models/indexModel.js";
import { orderRepository } from "./indexRepository.js";

const createFeedback = async (userId, productId, star, review) => {
  try {
    const isBought = await orderRepository.isUserBoughtProduct(userId, productId);
    if (isBought) {
      const newFeedback = await Feedback.create({
        user:userId,
        product:productId,
        star,
        review,
      });
      if (newFeedback.length === 0 || !newFeedback) {
        return {
          success: false,
          message: Exception.FEEDBACK_NOT_FOUND,
        };
      }
      return {
        success: true,
        message: Exception.FEEDBACK_SUCCESS,
        data: newFeedback,
      };
    } else {
      return {
        success: false,
        message: Exception.USER_DOESNT_NOT_BUY_PRODUCT,
      };
    }
  } catch (exception) {
    throw new Exception(Exception.CREATE_FEEBACK_FAILED);
  }
};
const getFeedbackByProductId = async (productId) => {
  try {
    const feedbacks = await Feedback.find({ product: productId })
    .populate({path:'product',select:'productName'}) 
    .populate({path:'user',select:'userName userEmail userAvatar'}) 
    .exec();
    if (feedbacks.length === 0 || !feedbacks) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: Exception.FEEDBACK_SUCCESS,
      data: feedbacks,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};
const updateFeedback = async (feedbackId, updateData) => {
  try {
    const updatedFeedback = await Feedback.findOneAndUpdate(
      { _id: feedbackId },
      updateData,
      { new: true }
    ).exec();
    if (!updatedFeedback) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: Exception.FEEDBACK_SUCCESS,
      data: updatedFeedback,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};
const deleteFeedback = async (feedbackId) => {
  try {
    const deletedFeedback = await Feedback.findOneAndRemove({
      _id: feedbackId,
    }).exec();

    if (!deletedFeedback) {
      return {
        success: false,
        message: Exception.FEEDBACK_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: Exception.FEEDBACK_DELETED,
      data: deletedFeedback,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  getFeedbackByProductId,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
