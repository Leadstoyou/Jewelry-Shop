import Exception from "../constant/Exception.js";
import HttpStatusCode from "../constant/HttpStatusCode.js";
import { productRepository } from "../repositories/indexRepository.js";

const createProductController = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productQuantity,
      productSizes,
      productPrice,
      productColors,
      productMaterials,
      productCategory,
      productDiscount = 0,
      productImage,
    } = req.body;

    const requiredFields = [
      "productName",
      "productDescription",
      "productQuantity",
      "productSizes",
      "productColors",
      "productMaterials",
      "productImage",
      "productPrice",
      "productCategory",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: `Missing required fields. Please provide values for ${missingFields.join(
          ", "
        )}.`,
      });
    }

    const newProduct = await productRepository.createNewProduct(
      productName,
      productDescription,
      productQuantity,
      productSizes,
      productPrice,
      productColors,
      productMaterials,
      productCategory,
      productDiscount,
      productImage
    );
    if (!newProduct.success) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: newProduct.message,
      });
    }
    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: newProduct.message,
      data: newProduct.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      productName,
      productDescription,
      productQuantity,
      productSizes,
      productPrice,
      productColors,
      productMaterials,
      productCategory,
      productDiscount,
      productImage,
      isDeleted,
    } = req.body;

    const newProduct = await productRepository.updateProduct(
      id,
      productName,
      productDescription,
      productQuantity,
      productSizes,
      productPrice,
      productColors,
      productMaterials,
      productCategory,
      productDiscount,
      productImage,
      isDeleted
    );
    if (!newProduct.success) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: newProduct.message,
      });
    }
    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: newProduct.message,
      data: newProduct.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const searchProductController = async (req, res) => {
  try {
    const name = req.params.name;

    const foundProduct = await productRepository.searchProductsByName(name);

    if (foundProduct.length === 0) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: foundProduct.message,
      });
    }

    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: foundProduct.message,
      data: foundProduct.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const viewProductController = async (req, res) => {
  try {
    const viewProducts = await productRepository.getAllProducts();
    if (!viewProducts) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: viewProducts.message,
      });
    }
    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: viewProducts.message,
      data: viewProducts.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.ID_NOT_FOUND,
      });
    }

    const deleteProduct = await productRepository.deleteProduct(id);
    if (!deleteProduct) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: deleteProduct.message,
      });
    }
    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: deleteProduct.message,
      data: deleteProduct.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const getOneProductController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.ID_NOT_FOUND,
      });
    }
    const product = await productRepository.getProductById(id);

    if (!product.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: product.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: product.message,
      data: product.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    if (!category) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.ID_NOT_FOUND,
      });
    }
    const products = await productRepository.getProductByCategories([category]);
    if (!products.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: products.message,
      });
    }
    return res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: products.message,
      data: products.data,
    });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
  }
};
export default {
  createProductController,
  updateProductController,
  searchProductController,
  viewProductController,
  deleteProductController,
  getOneProductController,
  getProductsByCategory,
};
