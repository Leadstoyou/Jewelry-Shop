import express from "express";
import { cartController } from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";
import { checkUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/view', checkUser, cartController.viewCart);
router.post('/update', cartController.updatedCart)
router.post('/add',checkUser, cartController.addToCart)
router.delete('/delete', cartController.removeFromCart);
router.delete('/cart', cartController.deleteAllCarts);

router.use(routeUnknown);

export default router;
