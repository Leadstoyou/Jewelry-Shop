import { Cart } from "../models/indexModel.js";
import {Product} from "../models/indexModel.js";
import {productRepository} from "./indexRepository.js";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const getCartByUser = async (userId) =>{
  try {
    const cart = await Cart.findOne({ user_id: userId}).exec();
    return cart;
  } catch (error) {
    throw error;
  }
};
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
const createEmptyCart = async (userId) => {
  try {
    const cartToken = (Math.random() + 1).toString(36).substring(2);

    if(userId){
    const newCart = new Cart({total: 0, cart_token: cartToken, user_id: userId});
    await newCart.save();
    return newCart;

    }else{
    const newCart = new Cart({total: 0, cart_token: cartToken});
    await newCart.save();
    
    return newCart;

    }
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createCartToken = async (cartId) => {
  try {
    
    const cartToken = (Math.random() + 1).toString(36).substring(7);
    const updatedCart = await Cart.findByIdAndUpdate(cartId, { cart_token: cartToken }, { new: true });

    return updatedCart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addProductToCart = async (cartToken, productId, quantity, size, color, material) => {
  try {
    const cart = await Cart.findById(cartToken);
    const product = await Product.findById(productId);
    const existingProductIndex = cart.productList.findIndex((product) => String(product.product_id) === String(productId));
    
    if (existingProductIndex !== -1) {
      const existingProduct = cart.productList[existingProductIndex];
      if (existingProduct.size[0] === size && existingProduct.color[0] === color && existingProduct.material[0] === material) {
        const newQuantity = existingProduct.quantity + quantity;
        existingProduct.quantity = newQuantity;
      } else {
        cart.productList.push({
          product_id: productId,
          productName: product.productName,
          productCategory: product.productCategory,
          quantity: quantity,
          size: size,
          color: color,
          material: material,
          price: product.productPrice,
          productImage: product.productImage,
          productDescription: product.productDescription
        });
      }
    } else {
      cart.productList.push({
        product_id: productId,
          productName: product.productName,
          productCategory: product.productCategory,
          quantity: quantity,
          size: size,
          color: color,
          material: material,
          price: product.productPrice,
          productImage: product.productImage,
          productDescription: product.productDescription
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

  const updateProductInCart = async (cartToken, productId, quantity, price) => {
    try {
      const product = await productRepository.getProductById(productId);
      //const price = Number(product.productPrice);
      if(quantity > product.quantity){
        throw new Error ("Not enough quantity in stock")
      }else {
      const updatedCart = await Cart.findOneAndUpdate(
        { cart_token: cartToken, 'productList.product_id':  productId},
        {
          $set: {
            'productList.$.quantity': quantity,

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

  const removeFromCart = async (cartToken, productId, size, color, material) => {
    try {
      const cart = await Cart.findOne({ cart_token: cartToken });
    if (!cart) {
      throw new Error("Cart not found");
    }
    const productIndex = cart.productList.findIndex((p) => {
      const isProductMatch =
        p.product_id.toString() === productId &&
        p.size[0] === size &&
        p.color[0] === color &&
        p.material[0] === material;

      return isProductMatch;
    });
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

  const removeCart = async (cartId) => {
    try {
    await Cart.findByIdAndDelete(cartId);
    } catch (error) {
    throw error;
    }
    };

  const deleteAllCarts = async () => {
    try {
      await Cart.deleteMany({});
    } catch (error) {
      throw new Error('Failed to delete all carts.');
    }
  };
  

export default {deleteAllCarts,getCartByTokenCookie, getCartByUser, updateTotalPrice, updateProductInCart,createCartToken, createEmptyCart, removeCart, getCartByToken, addProductToCart, removeFromCart};

