import HttpStatusCode from "../constant/HttpStatusCode.js";
import { cartRepository } from "../repositories/indexRepository.js";
import { productRepository } from "../repositories/indexRepository.js";

const viewCart = async (req, res) => {
    try {
      const cartToken = req.cookies.cart_token;
      const cart = await cartRepository.getCartByToken(cartToken);
      if (!cart) {
        const newCart = await cartRepository.createEmptyCart();
        res.cookie("cart_token", newCart.cart_token.toString(), {
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
        return res.status(HttpStatusCode.OK).json(newCart);
      }else{
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
      const cartToken = req.body.cart_token;
      const userId = req.body.user_id;
      const productId = req.body.product_id;
      const quantity = req.body.quantity;
      const size = req.body.size;
      const color = req.body.color;
      const material = req.body.material;
      const productImage = req.body.productImage;
      const productDes = req.body.productDescription;
      const price = req.body.price;

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const cart = await cartRepository.getCartByToken(cartToken);
      const product = await productRepository.getProductById(productId);
  
      if (!product) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
      }
  
      if (!cart) {
        // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng và thêm sản phẩm vào
        const newCart = await cartRepository.createEmptyCart();
        await cartRepository.addProductToCart(newCart._id, productId, quantity, size, color, material, price, productImage, productDes);
        res.cookie("cart_token", newCart.cart_token.toString(), {
          httpOnly: false,
          secure: true,
          sameSite: "None",
        });
      } else {
    if (!product) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    if (!cart) {
      // Nếu giỏ hàng không tồn tại, tạo mới giỏ hàng và thêm sản phẩm vào
      const newCart = await cartRepository.createEmptyCart();
      await cartRepository.addProductToCart(
        newCart._id,
        productId,
        quantity,
        size,
        color,
        material,
        price,
        productImage,
        productDes
      );
      res.cookie("cart_token", newCart.cart_token.toString(), {
        httpOnly: false,
        secure: true,
        sameSite: "None",
      });
    } else {
      await cartRepository.addProductToCart(
        cart._id,
        productId,
        quantity,
        size,
        color,
        material,
        price,
        productImage,
        productDes
      );
    }

    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Product added to cart successfully" });
  }} catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
const updatedCart = async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const size = req.body.size;
    const color = req.body.color;
    const material = req.body.material;
    const price = req.body.price;
    const cartToken = req.params.cart_token;
    const productId = req.body.product_id;
    const cartUpdate = await cartRepository.updateProductInCart(
      cartToken,
      productId,
      quantity,
      size,
      color,
      material,
      price
    );
    return res.status(HttpStatusCode.OK).json(cartUpdate);
  } catch (error) {
    console.error(error);
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
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
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
export default { removeFromCart, viewCart, addToCart, updatedCart };
