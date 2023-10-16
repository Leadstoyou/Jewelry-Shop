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
      const cartToken = req.body.cart_token;
      const userId = req.body.user_id;
      const productId = req.body.product_id;
      const quantity = req.body.quantity;
      const size = req.body.size;
      const color = req.body.color;
      const material = req.body.material;
      const productImage = req.body.productImage;
      const productDes = req.body.productDescription;
      const cartTokenCookie = req.cookies.cart_token;

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const cartCookie = await cartRepository.getCartByTokenCookie(cartTokenCookie);
      const cart = await cartRepository.getCartByToken(cartToken);
      const product = await productRepository.getProductById(productId);
  
      if (!product) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
      }
  
      if (!cart || !cartCookie) {
        // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng và thêm sản phẩm vào
        const newCart = await cartRepository.createCart(userId);
        await cartRepository.addProductToCart(newCart.cart_token, productId, quantity, size, color, material,productImage, productDes);
      } else {
        // Nếu giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
        const existingProduct = cart.products.find((p) => p.productId.toString() === productId);
        await cartRepository.addProductToCart(cartToken, productId, quantity, size, color, material,productImage, productDes);
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
      const cartToken = req.params.cart_token;
      const productId = req.body.product_id;
      const cart = await cartRepository.removeFromCart(cartToken, productId);
      return res.status(HttpStatusCode.OK).json(cart);
    } catch (err) {
      console.error(err);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
  export default {removeFromCart, viewCart, addToCart}