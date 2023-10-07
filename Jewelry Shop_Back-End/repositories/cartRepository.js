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
            product_list: {
              product_id,
              size,
              color,
              material,
              quantity,
              price,
            },
          },
        },
        { new: true, upsert: true }
      );
  
      let total = 0;
      cart.product_list.forEach((product) => {
        total += product.price * product.quantity;
      });
  
      await Cart.findOneAndUpdate(
        { cartToken },
        { $set: { total } },
        { new: true }
      );
  
      return cart;
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
export default { getCartByUserId, addToCart, removeFromCart};