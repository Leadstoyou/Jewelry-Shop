import express from "express";
import {orderController} from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();
router.post('/order/:cartToken', orderController.createOrder);

router.use(routeUnknown);
export default router 