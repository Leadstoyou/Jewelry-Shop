import HttpStatusCode from "../constant/HttpStatusCode.js";
import {cartRepository} from "../repositories/indexRepository.js";
import {productRepository} from "../repositories/indexRepository.js"
const viewCart = async (req, res) => {
    try {
      const cartToken = req.params.cart_token;
      const cart = await cartRepository.getCartByToken(cartToken);
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
      const cartToken = req.params.cart_token;
      const productId = req.body.productId;
      const quantity = req.body.quantity;
      const size = req.body.size;
      const color = req.body.color;
      const material = req.body.material;
  
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const cart = await cartRepository.getCartByToken(cartToken);
      const product = await productRepository.getProductById(productId);
  
      if (!product) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
      }
  
      if (!cart) {
        // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng và thêm sản phẩm vào
        const newCart = await cartRepository.createCart(cartToken);
        await cartRepository.addProductToCart(newCart._id, productId, quantity, size, color, material);
      } else {
        // Nếu giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
        const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
  
        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật thông tin sản phẩm
          await cartRepository.updateProductInCart(cart._id, productId, quantity, size, color, material);
        } else {
          // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào
          await cartRepository.addProductToCart(cart._id, productId, quantity, size, color, material);
        }
      }
  
      // Cập nhật tổng giá trị đơn hàng
      await cartRepository.updateTotalPrice(cartToken);
  
      return res.status(HttpStatusCode.OK).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
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