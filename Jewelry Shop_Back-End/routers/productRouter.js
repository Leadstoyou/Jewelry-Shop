import express from "express";
import { productController } from "../controllers/indexController.js";
import { checkPermission } from "../middleware/authMiddleware.js";
import ConfigConstants from "../constant/ConfigConstants.js";

const router = express.Router();

router.post("/create", productController.createProductController);
router.patch("/update/:id", productController.updateProductController);
router.get("/search/:name", productController.searchProductController);
router.post("/view", productController.viewProductController);
router.delete("/delete/:id", productController.deleteProductController);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/discount", productController.getProductHasDiscount);
router.get("/allDiscount", productController.getAllProductHasDiscount);
router.get("/get/:id", productController.getOneProductController);

export default router;
