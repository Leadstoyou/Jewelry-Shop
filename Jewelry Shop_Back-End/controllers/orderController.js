import HttpStatusCode from "../constant/HttpStatusCode.js";
import {cartRepository} from "../repositories/indexRepository.js"
import {orderRepository} from "../repositories/indexRepository.js"
const createOrder = async (req, res) => {
    try {
      const cartToken = req.params.cartToken;
      const userId = req.body.user_id;
      const orderStatus = req.body.orderStatus;
  
      const cart = await cartRepository.getCartByToken(cartToken);
      
      if (!userId) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'You have to login to buy' });
      }
      if (!cart) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Cart not found' });
      }
  
      await cartRepository.removePurchasedProducts(cart._id);
  
      return res.status(HttpStatusCode.OK).json({ message: 'Order created successfully' });
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };

  export default {createOrder}