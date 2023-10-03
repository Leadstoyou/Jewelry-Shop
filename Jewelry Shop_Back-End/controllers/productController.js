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
     res
      .status(HttpStatusCode.OK)
      .json({
        status: "OK",
        message: newProduct.message,
        data: newProduct.data,
      });
  } catch (exception) {
     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: exception.message,
    });
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
     res
      .status(HttpStatusCode.OK)
      .json({ message: "Product update successfully", data: newProduct });
  } catch (exception) {
     res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const searchProductController = async (req, res) => {
  try {
    const name = req.params.name;

    const foundProduct = await productRepository.searchProductsByName(name);

    if (foundProduct.length === 0) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: "Product not found",
      });
    }

     res
      .status(HttpStatusCode.OK)
      .json({ message: "Search products successfully", data: foundProduct.data });
  } catch (exception) {
     res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};
const viewProductController = async (req, res) => {
  try {
    const newProduct = await productRepository.getAllProducts();
     res
      .status(HttpStatusCode.OK)
      .json({ message: "Get view products successfully", data: newProduct });
  } catch (exception) {
     res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = await productRepository.deleteProduct(id);
     res
      .status(HttpStatusCode.OK)
      .json({ message: "Delete products successfully", data: newProduct });
  } catch (exception) {
     res
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
