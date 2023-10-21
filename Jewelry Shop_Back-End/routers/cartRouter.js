import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();

router.get('/view', cartController.viewCart);
router.post('/update/:cart_token', cartController.updatedCart)
router.post('/add', cartController.addToCart)
router.delete('/delete/:cart_token', cartController.removeFromCart);

router.use(routeUnknown);

export default router;
