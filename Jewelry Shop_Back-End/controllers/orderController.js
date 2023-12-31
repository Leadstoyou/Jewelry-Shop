import HttpStatusCode from "../constant/HttpStatusCode.js";
import {
  cartRepository,
  userRepository,
} from "../repositories/indexRepository.js";
import { orderRepository } from "../repositories/indexRepository.js";
import accountService from "../services/accountService.js";

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
    
    accountService.orderSendEmailService(order.order);
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
    const { page, limit, username } = req.query;
    const skip = (page - 1) * limit;

    let orders;
    let totalPage;

    if (username) {
      const { orders: searchedOrders, total } = await orderRepository.getOrdersByUsername(username, skip, limit);
      orders = searchedOrders;
      totalPage = Math.ceil(total / limit);
    } else {
      const { orders: allOrders, total } = await orderRepository.getAllOrder(skip, limit);
      orders = allOrders;
      totalPage = Math.ceil(total / limit);
    }

    res.json({ orders, totalPage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllExport = async (req, res) => {
  try {
    const orders = await orderRepository.getAllExport();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
//Dattt
const viewOrder = async (req, res) => {
  try {
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
//Dattt
const getAmountInMonth = async (req, res) => {
  try {
    const { month } = req.params;

    if (month < 1 || month > 12) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: "Invalid month value" });
      return;
    }
    const orders = await orderRepository.getAmountInMonth(month);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getAllOrdersInMonth = async (req, res) => {
  try {
    const { month } = req.params;

    if (month < 1 || month > 12) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ message: "Invalid month value" });
      return;
    }
    const orders = await orderRepository.getAllOrdersInMonth(month);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};


export default {
  createOrder,
  getOrder,
  getAllOrder,
  updateOrderStatus,
  getAmountInMonth,
  getAllOrdersInMonth,
  viewOrder,
  getAllExport
};
