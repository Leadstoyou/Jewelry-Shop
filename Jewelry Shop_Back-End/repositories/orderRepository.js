import Exception from "../constant/Exception.js";
import { Order } from "../models/indexModel.js";
import { User } from "../models/indexModel.js";
import { Cart } from "../models/indexModel.js";
const createOrder = async (userId, orderStatus) => {
  try {
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user_id: userId });
    const orderProductList = cart.productList;
    const newOrder = new Order({
      user_id: userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userPhoneNumber: user.userPhoneNumber,
      userAddress: user.userAddress,
      userAvatar: user.userAvatar,
      productList: orderProductList,
      orderDate: Date.now(),
      totalAmount: cart.total,
      orderStatus: orderStatus,
    });
    await newOrder.save();
    return {
      order: newOrder,
    };
  } catch (error) {
    throw error;
  }
};

const getAllExport = async (skip, limit) => {
  try {
    const orders = await Order.find()
    return orders;
  } catch (error) {
    throw error;
  }
};

const getAllOrderByUserID = async (userId) => {
  try {
    const orders = await Order.find({ user_id: userId });
    return orders;
  } catch (error) {
    throw error;
  }
};

const createOrderDetail = async (
  orderId,
  productId,
  quantity,
  size,
  color,
  material
) => {
  try {
    const newOrderDetail = new OrderDetail({
      order_id: orderId,
      product_id: productId,
      quantity,
      size,
      color,
      material,
    });
    await newOrderDetail.save();
    return newOrderDetail;
  } catch (error) {
    throw error;
  }
};

const getAllOrder = async (skip, limit) => {
  try {
    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments();

    return { orders, total };
  } catch (error) {
    throw error;
  }
};

const getOrdersByUsername = async (username, skip, limit) => {
  try {
    const cleanedUsername = username.trim();
    const orders = await Order.find({ userName: { $regex: cleanedUsername, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ userName: { $regex: cleanedUsername, $options: "i" } });

    return { orders, total };
  } catch (error) {
    throw new Error(`Failed to get orders for username: ${username}`);
  }
};

const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};
const getAmountInMonth = async (month) => {
  try {
    const year = new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const orders = await Order.find({
      orderDate: { $gte: startDate, $lte: endDate },
    });

    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += parseFloat(order.totalAmount);
    });

    return { month: month, "Total Amount": totalAmount };
  } catch (error) {
    throw error;
  }
};
const getAllOrdersInMonth = async (month) => {
  try {
    const year = new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const orders = await Order.find({
      orderDate: { $gte: startDate, $lte: endDate },
    });

    const totalOrdersInMonth = orders.length;

    return { month: month, "Total Orders In Month": totalOrdersInMonth };
  } catch (error) {
    throw error;
  }
};
const isUserBoughtProduct = async (userId, productId) => {
  try {
    const order = await Order.findOne({
      user_id: userId,
      "productList.product_id": productId,
    }).exec();

    if (order) {
      return true;
    } else {
      return false;
    }
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

export default {
  createOrder,
  createOrderDetail,
  getAllOrderByUserID,
  getAllOrder,
  updateOrderStatus,
  getAmountInMonth,
  getAllOrdersInMonth,
  isUserBoughtProduct,
  getOrdersByUsername,
  getAllExport
};
