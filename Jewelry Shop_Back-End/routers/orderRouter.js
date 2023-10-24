import express from "express";
import {orderController} from "../controllers/indexController.js";
import routeUnknown from "../middleware/routeMiddleware.js";

const router = express.Router();
router.post('/checkouts', orderController.createOrder);
router.get('/view', orderController.getOrder);
router.use(routeUnknown);
export default router 