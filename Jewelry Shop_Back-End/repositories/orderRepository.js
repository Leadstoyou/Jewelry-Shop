import { Order } from "../models/indexModel.js";
import { OrderDetail } from "../models/indexModel.js";

const createOrder = async (userId, order_date, total_amount, orderStatus) => {
    try {
      const newOrder = new Order({
        user_id: userId,
        order_date: order_date,
        total_amount: total_amount,
        orderStatus: orderStatus,
      });
      await newOrder.save();
      return newOrder;
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
    } catch (error) {
      throw error;
    }
  };

  export default {createOrder, createOrderDetail}