import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/indexController.js";
import {checkToken,checkUser} from "../middleware/authMiddleware.js";
import constants from "../constant/constants.js";

const router = express.Router();

router.get("/",checkUser([constants.ADMIN_ROLE_ID]), userController.userGetAllUsersController);

router.post("/", userController.userSearchController);

router.post("/login", body("userEmail").isEmail(), userController.userLoginController);

router.post("/refreshToken",checkUser([constants.ADMIN_ROLE_ID,constants.STAFF_ROLE_ID,constants.USER_ROLE_ID]), userController.refreshAccessTokenController);

router.get("/logout",checkUser([constants.ADMIN_ROLE_ID,constants.STAFF_ROLE_ID,constants.USER_ROLE_ID]), userController.userLogoutController);

router.post("/register", userController.userRegisterController);

router.get("/verify/:userVerifyResetToken", userController.verifyEmailController);

router.get("/forgotPassword", userController.userForgotPasswordController);

router.put("/resetPassword", userController.userResetPasswordController);

router.put("/changePassword",checkUser([constants.ADMIN_ROLE_ID,constants.STAFF_ROLE_ID,constants.USER_ROLE_ID]), userController.userChangePasswordController);

router.get("/viewProfile",checkUser([constants.ADMIN_ROLE_ID,constants.STAFF_ROLE_ID,constants.USER_ROLE_ID]), userController.userViewProfileController);

router.put("/updateProfile",checkUser([constants.ADMIN_ROLE_ID,constants.STAFF_ROLE_ID,constants.USER_ROLE_ID]), userController.userUpdateProfileController);

router.put("/updateRole",checkUser([constants.ADMIN_ROLE_ID]), userController.userUpdateRoleController);

router.put("/updateStatus",checkUser([constants.ADMIN_ROLE_ID]), userController.userUpdateStatusController);

router.put("/updateBlock",checkUser([constants.ADMIN_ROLE_ID]), userController.userUpdateBlockController);


export default router;
