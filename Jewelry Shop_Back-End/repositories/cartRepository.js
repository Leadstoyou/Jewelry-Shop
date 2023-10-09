import { Cart } from "../models/indexModel.js";
import mongoose from "mongoose";


const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user_id: userId });
    return cart;
  };

  const addToCart = async (cartToken, user_id, product_id, size, color, material, quantity, price) => {
    try {
      const cart = await Cart.findOneAndUpdate(
        { cartToken },
        {
          $push: {
            productList: {
              product_id,
              size,
              color,
              material,
            },
          },
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }
    const productIndex = cart.products.findIndex(p => p.product_id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found in cart');
    }
    const product = cart.products[productIndex];
    cart.products.splice(productIndex, 1);
    cart.total -= product.price * product.quantity;
    await cart.save();
    return cart;
  };

  const removePurchasedProducts = async (cartId) => {
    try {
      await Cart.findByIdAndUpdate(cartId, { $pull: { products: {} } });
    } catch (error) {
      throw error;
    }
  };
export default {removePurchasedProducts, getCartByUserId, addToCart, removeFromCart};