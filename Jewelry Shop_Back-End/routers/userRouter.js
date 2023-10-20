import express from "express";
import { userController } from "../controllers/indexController.js";
import {checkPermission, checkToken} from "../middleware/authMiddleware.js";
import ConfigConstants from "../constant/ConfigConstants.js";

const router = express.Router();

router.get("/",checkToken, userController.userGetAllUsersController);

router.get("/search",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userSearchController);

router.post("/login", userController.userLoginController);

router.get("/logout",checkPermission([ConfigConstants.ADMIN_ROLE_ID,ConfigConstants.STAFF_ROLE_ID,ConfigConstants.USER_ROLE_ID]), userController.userLogoutController);

router.post("/register", userController.userRegisterController);

router.get("/verify/:userVerifyResetToken", userController.verifyEmailController);

router.get("/forgotPassword", userController.userForgotPasswordController);

router.put("/resetPassword", userController.userResetPasswordController);

router.put("/changePassword",checkPermission([ConfigConstants.ADMIN_ROLE_ID,ConfigConstants.STAFF_ROLE_ID,ConfigConstants.USER_ROLE_ID]), userController.userChangePasswordController);

router.get("/viewProfile",checkToken, userController.userViewProfileController);

router.put("/updateProfile",checkPermission([ConfigConstants.ADMIN_ROLE_ID,ConfigConstants.STAFF_ROLE_ID,ConfigConstants.USER_ROLE_ID]), userController.userUpdateProfileController);

router.put("/updateRole",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateRoleController);

router.put("/updateStatus",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateStatusController);

router.put("/updateBlock",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateBlockController);


export default router;
