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
const createEmptyCart = async () => {
  try {
    const newCart = new Cart({total: 0, cart_token: "carttoken"});
    await newCart.save();
    return newCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createCartToken = async (cartId) => {
  try {

    const updatedCart = await Cart.findByIdAndUpdate(cartId, { cart_token: cartToken }, { new: true });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addProductToCart = async (cartToken, productId, quantity, size, color, material, price, productImage, productDes) => {
  try {
    const cart = await Cart.findById(cartToken);

    const existingProductIndex = cart.productList.findIndex((product) => String(product.product_id) === String(productId));
    
    if (existingProductIndex !== -1) {
      const existingProduct = cart.productList[existingProductIndex];
      if (existingProduct.size[0] === size && existingProduct.color[0] === color && existingProduct.material[0] === material) {
        const newQuantity = existingProduct.quantity + quantity;
        existingProduct.quantity = newQuantity;
      } else {
        cart.productList.push({
          product_id: productId,
          quantity: quantity,
          size: size,
          color: color,
          material: material,
          price: price,
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
        price: price,
        productImage: productImage,
        productDescription: productDes
      });
    }

    await cart.save();
    let totalPrice = 0;

    for (const product of cart.productList) {
      if (typeof product.quantity === 'number' && typeof product.price === 'number' && !isNaN(product.quantity) && !isNaN(product.price)) {
        totalPrice += product.quantity * product.price;
      }
    }

    cart.total = totalPrice;
    const updatedCart = await cart.save();
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

  const updateProductInCart = async (cartToken, productId, quantity, size, color, material, price) => {
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
             total: quantity*price,
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
      const totalPrice = cart.productList.reduce((acc, product) => {
        if (typeof product.quantity === 'number' && typeof product.price === 'number' && !isNaN(product.quantity) && !isNaN(product.price)) {
          return acc + product.quantity * product.price;
        }
        return acc;
      }, 0);
  
  
      const updatedCart = await Cart.findOneAndUpdate(
        { cart_token: cartToken },
        { total: totalPrice, cart_token: cartToken },
        { new: true }
      );
  
      return updatedCart;
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

export default {getCartByTokenCookie, updateTotalPrice, updateProductInCart,createCartToken, createEmptyCart, removePurchasedProducts, getCartByToken, addProductToCart, removeFromCart};

