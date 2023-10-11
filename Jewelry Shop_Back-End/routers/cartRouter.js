import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

router.get('/:cart_token', cartController.viewCart);
router.post('/add/:cart_token', cartController.addToCart)
router.delete('/:userId/:productId', cartController.removeFromCart);

router.use(routeUnknown);

export default router;
