import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

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

router.get("/search/:name", userController.userSearchbyNameController);

router.use(routeUnknown);

export default router;
