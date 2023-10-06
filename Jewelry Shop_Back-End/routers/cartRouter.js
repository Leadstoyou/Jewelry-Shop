import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

router.get('/cart/:userId', cartController.viewCart);
router.get('/cart/add/:userId', cartController.addToCart)
router.delete('/cart/:userId/:productId', cartController.removeFromCart);

router.use(routeUnknown);

export default router;
