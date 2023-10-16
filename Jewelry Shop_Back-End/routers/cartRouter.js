import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

router.get('/:cart_token', cartController.viewCart);
router.post('/cart/update/:cart_token', cartController.updatedCart)
router.post('/add', cartController.addToCart)
router.delete('/delete/:cart_token', cartController.removeFromCart);

router.use(routeUnknown);

export default router;
