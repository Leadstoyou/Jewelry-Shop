import { Cart } from "../models/indexModel.js";
import mongoose from "mongoose";


const getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ user_id: userId });
    return cart;
  };

const addToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = new Cart({
        user_id: userId,
        products: [{ product_id: productId, quantity: quantity }]
      });
    } else {
      const productIndex = cart.products.findIndex(p => p.product_id === productId);
      if (productIndex === -1) {
        cart.products.push({ product_id: productId, quantity: quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }
    }
    await cart.save();
    return cart;
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
  cart.products.splice(productIndex, 1);
  await cart.save();
  return cart;
};
export default { getCartByUserId, addToCart, removeFromCart};