import Exception from "../constant/Exception.js";
import HttpStatusCode from "../constant/HttpStatusCode.js";
import { feedbackRepository } from "../repositories/indexRepository.js";

const createFeedback = async (req, res) => {
  try {
    const { productId, star, review } = req.body;
    const userId = req?.user?.userId;
    if (!userId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.USER_MUST_LOGIN_TO_CONTINUE,
      });
    }
    if (!productId || !star || !review) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.INPUT_DATA_ERROR,
      });
    }

    const feedback = await feedbackRepository.createFeedback(
      userId,
      productId,
      star,
      review
    );
    if (!feedback.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: feedback.message,
      });
    }
    return res.status(HttpStatusCode.CREATED).json({
      status: "OK",
      message: feedback.message,
      data: feedback.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const getFeedbackByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.INPUT_DATA_ERROR,
      });
    }
    const feedbacks = await feedbackRepository.getFeedbackByProductId(
      productId
    );
    if (!feedbacks.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: feedbacks.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: feedbacks.message,
      data: feedbacks.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const updateFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { star, review } = req.body;
    if (!feedbackId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.INPUT_DATA_ERROR,
      });
    }
    const feedback = await feedbackRepository.updateFeedback(feedbackId, {
      star,
      review,
    });
    if (!feedback.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: feedback.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: feedback.message,
      data: feedback.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    if (!feedbackId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.INPUT_DATA_ERROR,
      });
    }
    const feedbacks = await feedbackRepository.deleteFeedback(feedbackId);
    if (!feedbacks.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: feedbacks.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: feedbacks.message,
      data: feedbacks.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
export default {
  createFeedback,
  getFeedbackByProductId,
  updateFeedback,
  deleteFeedback,
};
