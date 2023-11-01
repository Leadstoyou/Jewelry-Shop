import HttpStatusCode from "../constant/HttpStatusCode.js";
import { cartRepository } from "../repositories/indexRepository.js";
import { productRepository } from "../repositories/indexRepository.js";

const viewCart = async (req, res,next) => {
    try {
      const cartToken = req.cookies.cart_token;
      const userId = req?.user?.userId;
      console.log("lmro",req.user);
      let cart = null;

      if (userId) {
        cart = await cartRepository.getCartByUser(userId);
      } else {
        cart = await cartRepository.getCartByToken(cartToken);
      }
      
      if (!cart) {
        const newCart = await cartRepository.createEmptyCart(userId);
        res.cookie("cart_token", newCart.cart_token.toString(), {
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        
        return res.status(HttpStatusCode.OK).json(newCart);
      } else {
        res.cookie("cart_token", cart.cart_token.toString(), {
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        return res.status(HttpStatusCode.OK).json(cart);
      }
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };

  const addToCart = async (req, res) => {
    try {
      const cartToken = req.cookies.cart_token;
      const userId = req?.user?.userId;
      const productId = req.body.product_id;
      const quantity = req.body.quantity;
      const size = req.body.size;
      const color = req.body.color;
      const material = req.body.material;
      


      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      let cart = null;
      console.log(userId)
      if(userId){
        cart = await cartRepository.getCartByUser(userId)
      }
      
      const product = await productRepository.getProductById(productId);
        
      if (!product) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
      }
      if(!cart){
        cart = await cartRepository.getCartByToken(cartToken);
        if (!cart) {
          const newCart = await cartRepository.createEmptyCart();
          await cartRepository.addProductToCart(newCart._id, productId, quantity, size, color, material);
          res.cookie("cart_token", newCart?.cart_token.toString(), {
            httpOnly: false,
            secure: true,
            sameSite: "None",
          });
        } else {
          
          await cartRepository.addProductToCart(cart._id, productId, quantity, size, color, material);
          
          }
      }else{
        await cartRepository.addProductToCart(cart._id, productId, quantity, size, color, material);
      }
      
    return res.status(HttpStatusCode.OK).json({ message: "Product added to cart successfully" });
  }
   catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Internal server error" });
  }
  };
  const updatedCart = async(req,res)=> {
    try {
      const price = req.body.price;
      const quantity = req.body.quantity;
      const cartToken = req.cookies.cart_token;
      const productId = req.body.product_id;
      
      const cartUpdate = await cartRepository.updateProductInCart(cartToken, productId, quantity, price);
      return res.status(HttpStatusCode.OK).json(cartUpdate);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
  const removeFromCart = async (req, res) => {
    try {
      const cartToken = req.cookies.cart_token;
      const productId = req.body.product_id;
      const size = req.body.size;
      const color = req.body.color;
      const material = req.body.material;
      const cart = await cartRepository.removeFromCart(cartToken, productId, size, color, material);
      return res.status(HttpStatusCode.OK).json(cart);
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };

  const deleteAllCarts = async (req, res) => {
    try {
      await cartRepository.deleteAllCarts();
      res.status(200).json({ message: 'All carts have been deleted.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };
  export default {removeFromCart, viewCart, addToCart, updatedCart, deleteAllCarts}