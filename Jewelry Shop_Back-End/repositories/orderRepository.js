import { Order } from "../models/indexModel.js";
import { OrderDetail } from "../models/indexModel.js";
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
        productList : orderProductList,
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
  
  const createOrderDetail = async (orderId, productId, quantity, size, color, material) => {
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
  const getAllOrderByUserID = async (userId) => {
    try {
      const orders = await Order.find({ user_id: userId });
      return orders;
    } catch (error) {
      throw error;
    }
  };
  export default {createOrder, createOrderDetail, getAllOrderByUserID}