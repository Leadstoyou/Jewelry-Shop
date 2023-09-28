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

router.post("/register", userController.userRegisterController);

router.post("/changePassword", userController.userChangePasswordController);

router.post("/updateProfile", userController.userUpdateProfileController);

export default router;
