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
      productDiscount = [],
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
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
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
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
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
    if (!name || name.trim().length === 0) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.NAME_NOT_FOUND,
      });
      return;
    }
    const foundProduct = await productRepository.searchProductsByName(name);

    if (!foundProduct.success) {
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
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
    const { category, color, material, minPrice, maxPrice, sort, page, limit,isDeleted } =
      req.body;
    const viewProducts = await productRepository.getAllProducts(
      category,
      color,
      material,
      minPrice,
      maxPrice,
      sort,
      page,
      limit,
      isDeleted
    );
    if (!viewProducts.success) {
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
    }

    res.status(HttpStatusCode.OK).json({
      status: "OK",
      message: viewProducts.message,
      data: viewProducts.data,
    });
    return;
  } catch (exception) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ status: "ERROR", message: exception.message });
    return;
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
    if (!deleteProduct.success) {
      res.status(HttpStatusCode.NO_CONTENT).end();
      return;
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

const getProductHasDiscount = async (req, res) => {
  try {
    const { startDate, expiredDate } = req.body;
    if (!expiredDate || !startDate) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        status: "ERROR",
        message: Exception.INPUT_DATA_ERROR,
      });
    }

    const products = await productRepository.getProductHasDiscount(
      new Date(startDate),
      new Date(expiredDate)
    );

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
const getAllProductHasDiscount = async (req, res) => {
  try {
    const products = await productRepository.getProductHasDiscount(
      new Date(),
      new Date(),
      true
    );

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
  getProductHasDiscount,
  getAllProductHasDiscount,
};
