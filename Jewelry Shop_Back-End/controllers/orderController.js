import HttpStatusCode from "../constant/HttpStatusCode.js";
import {
  cartRepository,
  userRepository,
} from "../repositories/indexRepository.js";
import { orderRepository } from "../repositories/indexRepository.js";
const createOrder = async (req, res) => {
  try {
    const cartToken = req.cookies.cart_token;
    const userId = req.user?.userId;
    const orderStatus = req.body.orderStatus;

    if (!userId) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "You have to login to buy" });
    }
    const cart = await cartRepository.getCartByToken(cartToken);

    if (!cart) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Cart not found" });
    }

    const order = await orderRepository.createOrder(userId, orderStatus);

    await cartRepository.removeCart(cart._id);

    return res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const getOrder = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const orders = await orderRepository.getAllOrderByUserID(userId);
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const getAllOrder = async (req, res) => {
  try {
    const orders = await orderRepository.getAllOrder();
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const orderStatus = req.body.orderStatus;

  try {
    const updatedOrder = await orderRepository.updateOrderStatus(
      orderId,
      orderStatus
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
const viewOrder = async (req, res) => {
  try {
    console.log(123,req.user)
    const userId = req?.user?.userId;
    const { cart_token } = req?.cookies;
    const cart = await cartRepository.getCartByToken(cart_token);
    const userInfo = await userRepository.userViewProfileDetailRepository(
      userId
    );
    return res.status(HttpStatusCode.OK).json({ cart: cart, userInfo });
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
export default {
  createOrder,
  getOrder,
  getAllOrder,
  updateOrderStatus,
  viewOrder,
};
