import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

function hasParams(req, res, next) {
  const { page, size, searchString } = req.query;
  if (page || size || searchString) {
    return userController.userSearchController(req, res, next);
  } else {
    return userController.userGetAllUsersController(req, res, next);
  }
}

router.get("/", hasParams);

router.post(
  "/login",
  body("userEmail").isEmail(),
  userController.userLoginController
);

router.get("/logout", userController.userLogoutController);

router.post("/register", userController.userRegisterController);

router.put("/changePassword", userController.userChangePasswordController);

router.put("/updateProfile", userController.userUpdateProfileController);

router.put("/updateRole", userController.userUpdateRoleController);

router.put("/updateStatus", userController.userUpdateStatusController);

router.post("/refreshToken", userController.refreshAccessTokenController);

router.get("/search/:name", userController.userSearchbyNameController);

router.use(routeUnknown);
router.get("/forgotPassword", userController.userForgotPasswordController);

router.put("/resetPassword", userController.userResetPasswordController);

export default router;
