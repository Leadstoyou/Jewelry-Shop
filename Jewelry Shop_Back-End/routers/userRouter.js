import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/indexController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello user Shop");
});

router.post(
  "/login",
  body("userEmail").isEmail(),
  userController.userLoginController
);

router.post("/logout", userController.userLogoutController);

router.post("/register", userController.userRegisterController);

router.put("/changePassword", userController.userChangePasswordController);

router.put("/updateProfile", userController.userUpdateProfileController);

router.put("/updateRole", userController.userUpdateRoleController);

router.put("/updateStatus", userController.userUpdateStatusController);

router.post("/refreshToken", userController.refreshAccessTokenController);

export default router;
