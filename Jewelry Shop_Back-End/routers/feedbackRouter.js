import express from "express";
import { feedbackController } from "../controllers/indexController.js";
import { checkUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create",checkUser, feedbackController.createFeedback);
router.get('/:productId',feedbackController.getFeedbackByProductId);
router.put("/update/:feedbackId", feedbackController.updateFeedback);
router.delete("/delete/:feedbackId",feedbackController.deleteFeedback);
export default router;
