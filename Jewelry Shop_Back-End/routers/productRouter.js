import express from "express";
import { productController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";
import { checkUser } from "../middleware/authMiddleware.js";
import constants from "../constant/constants.js";

const router = express.Router();

router.post("/create", productController.createProductController);

router.patch("/update/:id", productController.updateProductController);

router.get("/search/:name", productController.searchProductController);

router.get("/view",productController.viewProductController);

router.delete("/delete/:id", productController.deleteProductController);

router.use(routeUnknown);

export default router;
