import express from "express";
import { productController } from "../controllers/indexController.js";
import { checkUser } from "../middleware/authMiddleware.js";
import constants from "../constant/constants.js";

const router = express.Router();

router.post("/create", productController.createProductController);
router.patch("/update/:id", productController.updateProductController);
router.get("/search/:name", productController.searchProductController);
router.post("/view",checkUser([constants.USER_ROLE_ID]), productController.viewProductController);
router.delete("/delete/:id", productController.deleteProductController);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/discount", productController.getProductHasDiscount);
router.get("/allDiscount", productController.getAllProductHasDiscount);
router.get("/get/:id", productController.getOneProductController);

export default router;
