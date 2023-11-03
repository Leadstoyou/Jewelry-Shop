import express from "express";
import { userController } from "../controllers/indexController.js";
import {checkPermission, checkToken} from "../middleware/authMiddleware.js";
import ConfigConstants from "../constant/ConfigConstants.js";

const router = express.Router();

router.get("/",checkToken, userController.userGetAllUsersController);
router.get("/search",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userSearchController);
router.put("/changePassword",checkToken, userController.userChangePasswordController);
router.get("/viewProfile",checkToken, userController.userViewProfileController);
router.get("/viewProfileDetail",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userViewProfileDetailController);
router.put("/updateProfile",checkToken, userController.userUpdateProfileController);
router.put("/updateRole",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateRoleController);
router.put("/updateStatus",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateStatusController);
router.put("/updateBlock",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateBlockController);
router.put("/updateByAdmin",checkPermission([ConfigConstants.ADMIN_ROLE_ID]), userController.userUpdateByAdminController);

export default router;
