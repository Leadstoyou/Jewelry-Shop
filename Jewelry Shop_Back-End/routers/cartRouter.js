import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

router.get('/:userId', cartController.viewCart);
router.get('/add/:userId', cartController.addToCart)
router.delete('/:userId/:productId', cartController.removeFromCart);

router.use(routeUnknown);

export default router;
