import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";
import checkToken from "../middleware/authMiddleware.js";

const router = express.Router();

function hasParams(req, res, next) {
  const { page, size, searchString } = req.query;
  if (page || size || searchString) {
    return userController.userSearchController(req, res, next);
  } else {
    return userController.userGetAllUsersController(req, res, next);
  }
}

router.get("/",checkToken, hasParams);

router.post("/login", body("userEmail").isEmail(), userController.userLoginController);

router.get("/logout", userController.userLogoutController);

router.post("/register", userController.userRegisterController);

router.put("/changePassword",checkToken, userController.userChangePasswordController);

router.put("/updateProfile",checkToken, userController.userUpdateProfileController);

router.put("/updateRole",checkToken, userController.userUpdateRoleController);

router.put("/updateStatus",checkToken, userController.userUpdateStatusController);

router.post("/refreshToken", userController.refreshAccessTokenController);

router.get("/forgotPassword", userController.userForgotPasswordController);

router.put("/resetPassword", userController.userResetPasswordController);

router.get("/verify/:userEmail", userController.verifyEmailController);

// router.get("/search/:name", userController.userSearchbyNameController);

router.use(routeUnknown);

export default router;
