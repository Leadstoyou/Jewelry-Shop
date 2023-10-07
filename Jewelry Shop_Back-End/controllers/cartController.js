import HttpStatusCode from "../constant/HttpStatusCode.js";
import {cartRepository} from "../repositories/indexRepository.js";
const viewCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cart = await cartRepository.getCartByUserId(userId);
      if (!cart) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Cart not found' });
      }
      return res.status(HttpStatusCode.OK).json(cart);
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
  const addToCart = async (req, res) => {
    try {
      const { cartToken, user_id, product_id, size, color, material, quantity, price } = req.body;
      const cart = await cartRepository.addToCart(cartToken, user_id, product_id, size, color, material, quantity, price);
      res.status(HttpStatusCode.OK).json(cart);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  };
  const removeFromCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const cart = await cartRepository.removeFromCart(userId, productId);
      return res.status(HttpStatusCode.OK).json(cart);
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
  export default {removeFromCart, viewCart, addToCart}