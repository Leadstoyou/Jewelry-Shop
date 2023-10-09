import { Cart } from "../models/indexModel.js";
import mongoose from "mongoose";


const getCartByToken = async (cartToken) => {
  try {
    const cart = await Cart.findOne({ cart_token: cartToken });
    return cart;
  } catch (error) {
    throw error;
  }
};
const createCart = async (cartToken) => {
  try {
    const newCart = new Cart({ cart_token: cartToken });
    await newCart.save();
    return newCart;
  } catch (error) {
    throw error;
  }
};
  const addProductToCart = async (cartId, productId, quantity, size, color, material) => {
    try {
      await Cart.findByIdAndUpdate(
        cartId,
        {
          $push: {
            products: {
              productId,
              quantity,
              size,
              color,
              material,
            },
          },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  };

  const updateProductInCart = async (cartId, productId, quantity, size, color, material) => {
    try {
      await Cart.findOneAndUpdate(
        { _id: cartId, 'products.productId': productId },
        {
          $set: {
            'products.$.quantity': quantity,
            'products.$.size': size,
            'products.$.color': color,
            'products.$.material': material,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };

  const updateTotalPrice = async (cartToken) => {
    try {
      const cart = await Cart.findOne({ cart_token: cartToken });
      const totalPrice = cart.products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);
  
      await Cart.findOneAndUpdate({ cart_token: cartToken }, { total_price: totalPrice });
    } catch (error) {
      throw error;
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
export default {updateTotalPrice, updateProductInCart, createCart, removePurchasedProducts, getCartByToken, addProductToCart, removeFromCart};