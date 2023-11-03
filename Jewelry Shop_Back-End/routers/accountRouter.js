import express from "express";
import { accountController } from "../controllers/indexController.js";

const router = express.Router();

router.post("/login", accountController.userLoginController);
router.get("/logout", accountController.userLogoutController);
router.post("/register", accountController.userRegisterController);
router.get("/verify/:userVerifyResetToken", accountController.verifyEmailController);
router.get("/forgotPassword", accountController.userForgotPasswordController);
router.put("/resetPassword", accountController.userResetPasswordController);

export default router;
