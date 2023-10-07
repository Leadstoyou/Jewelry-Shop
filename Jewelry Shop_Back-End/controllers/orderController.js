import HttpStatusCode from "../constant/HttpStatusCode";
import {cartRepository} from "../repositories/indexRepository"
import {orderRepository} from "../repositories/indexRepository"
const createOrder = async (req, res) => {
    try {
      const cartToken = req.params.cartToken;
      const userId = req.body.userId;
      const order_date = req.body.order_date;
      const total_amount = req.body.total_amount;
      const orderStatus = req.body.orderStatus;
  
      const cart = await cartRepository.getCartByUserId(userId);
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const order = await orderRepository.createOrder(userId, order_date, total_amount, orderStatus);
  
      for (const product of cart.products) {
        await orderRepository.createOrderDetail(order._id, product.productId, product.quantity, product.size, product.color, product.material);
      }
  
      await cartRepository.removePurchasedProducts(cart._id);
  
      return res.status(HttpStatusCode.OK).json({ message: 'Order created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };

  export default {createOrder}