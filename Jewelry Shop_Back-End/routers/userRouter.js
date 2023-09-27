import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.get("/", userController.getAllUser);

router.get("/:id", userController.getDetailUser);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  userController.login
);

router.post("/register", userController.register);

router.post(
  "/changepassword",
  body("oldPassword").isLength({ min: 5 }), 
  body("newPassword").isLength({ min: 5 }),
  userController.changePassword
);



export default router;
