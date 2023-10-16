import { Cart } from "../models/indexModel.js";
import {Product} from "../models/indexModel.js";
import {productRepository} from "./indexRepository.js";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const getCartByToken = async (cartToken) => {
  try {
    const cart = await Cart.findOne({ cart_token: cartToken }).exec();
    return cart;
  } catch (error) {
    throw error;
  }
};
const getCartByTokenCookie = async (cartTokenCookie) => {
  try {
    const cartCookie = await getCartByToken(cartTokenCookie);
    return cartCookie;
  } catch (error) {
    throw error;
  }
};
const createCart = async (userId) => {
  try {
    let cartData = {};

    if (userId) {
      cartData.user_id = userId;
    }

    const cartToken = Jwt.sign(cartData, process.env.ACCESS_TOKEN);
    
    const newCart = new Cart({ cart_token: cartToken });
    await newCart.save();
    return newCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const addProductToCart = async (cartToken, productId, quantity, size, color, material, productImage, productDes) => {
  try {
    const cart = await Cart.findById(cartToken);

    const existingProduct = cart.productList.find((product) => product.product_id === productId);

    if (existingProduct) {
      if (existingProduct.size === size && existingProduct.color === color && existingProduct.material === material) {
        existingProduct.quantity += quantity;
      } else {
        cart.productList.push({
          product_id: productId,
          quantity: quantity,
          size: size,
          color: color,
          material: material,
          productImage: productImage,
          productDescription: productDes
        });
      }
    } else {
      cart.productList.push({
        product_id: productId,
        quantity: quantity,
        size: size,
        color: color,
        material: material,
        productImage: productImage,
        productDescription: productDes
      });
    }

    await cart.save();
  } catch (error) {
    throw error;
  }
};

  const updateProductInCart = async (cartToken, productId, quantity, size, color, material) => {
    try {
      const product = await productRepository.getProductById(productId);
      if(quantity > product.quantity){
        throw new Error ("Not enough quantity in stock")
      }else {
      const updatedCart = await Cart.findOneAndUpdate(
        { cart_token: cartToken, 'productList.product_id':  productId},
        {
          $set: {
            'productList.$.quantity': quantity,
            'productList.$.size': size,
            'productList.$.color': color,
            'productList.$.material': material,
          },
        },
        {new: true}
      );
      return updatedCart ;
      }
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

  const removeFromCart = async (cartToken, productId) => {
    try {
      const cart = await Cart.findOne({ cart_token: cartToken });
    if (!cart) {
      throw new Error("Cart not found");
    }
    const productIndex = cart.productList.findIndex(p => p.product_id.toString() === productId);
    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }
    const product = cart.productList[productIndex];
    cart.productList.splice(productIndex, 1);
    cart.total -= product.price * product.quantity;
    await cart.save();
    return cart;
    } catch (error) {
      throw error
    }
  };

  const removePurchasedProducts = async (cartId) => {
    try {
      await Cart.findByIdAndUpdate(cartId, { $pull: { productList: {} } });
    } catch (error) {
      throw error;
    }
  };

export default {getCartByTokenCookie, updateTotalPrice, updateProductInCart, createCart, removePurchasedProducts, getCartByToken, addProductToCart, removeFromCart};

