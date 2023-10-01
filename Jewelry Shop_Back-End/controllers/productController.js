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
      productDiscount,
      productImage,
    } = req.body;

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
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
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
      isDeleted
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
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Product update successfully", data: newProduct });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const searchProductController = async (req, res) => {
  try {
    const name = req.params.name;

    const newProduct = await productRepository.searchProductsByName(name);
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Search products successfully", data: newProduct });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const viewProductController = async (req, res) => {
  try {
    const newProduct = await productRepository.getAllProducts();
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Get view products successfully", data: newProduct });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = await productRepository.deleteProduct(id);
    return res
      .status(HttpStatusCode.OK)
      .json({ message: "Delete products successfully", data: newProduct });
  } catch (exception) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
export default {
  createProductController,
  updateProductController,
  searchProductController,
  viewProductController,
  deleteProductController,
};
