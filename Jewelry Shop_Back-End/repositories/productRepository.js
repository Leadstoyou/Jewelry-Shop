import cloudinaryService from "../services/cloudinaryService.js";
import constants from "../constant/constants.js";
import { Product } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import mongoose from "mongoose";

const createNewProduct = async (
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
) => {
  let productImageUrl;
  try {
    productImageUrl = await cloudinaryService.uploadProductImageToCloudinary(
      productImage,
      constants.CLOUDINARY_PRODUCT_IMG
    );
      console.log(productDiscount)
    const newProduct = await Product.create({
      productName,
      productDescription,
      productQuantity,
      productSizes,
      productPrice,
      productColors,
      productMaterials,
      productCategory,
      productDiscount,
      productImage: productImageUrl,
    });
    if (!newProduct) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Create product successfully!",
      data: newProduct,
    };
  } catch (exception) {
    if (productImageUrl) {
      await cloudinaryService.deleteImageFromCloudinary(productImageUrl);
    }
    if (
      exception.code === 11000 &&
      exception.keyPattern &&
      exception.keyPattern.productName
    ) {
      throw new Exception("Product is duplicated with the same productName.");
    }
    throw new Exception(exception.message);
  }
};

const searchProductsByName = async (searchTerm) => {
  try {
    const query = {
      $or: [
        { productName: new RegExp(searchTerm, "i") },
      ],
    };

    const searchResult = await Product.find(query).exec();
    if (!searchResult) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Search product successfully!",
      data: searchResult,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getAllProducts = async () => {
  try {
    const getAllProducts = await Product.find({}).exec();
    if (!getAllProducts) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Get all product successfully!",
      data: getAllProducts,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};
const updateProduct = async (
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
) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        ...(productName && { productName }),
        ...(productDescription && { productDescription }),
        ...(productQuantity && { productQuantity }),
        ...(productSizes && { productSizes }),
        ...(productPrice && { productPrice }),
        ...(productColors && { productColors }),
        ...(productMaterials && { productMaterials }),
        ...(productCategory && { productCategory }),
        ...(productDiscount && { productDiscount }),
        ...(productImage && {
          productImage: await cloudinaryService.uploadProductImageToCloudinary(
            productImage,
            constants.CLOUDINARY_PRODUCT_IMG
          ),
        }),
        ...(isDeleted !== undefined && { isDeleted }),
      },
      { new: true }
    ).exec();
    if (!updateProduct) {
      return {
        success: false,
        message: Exception.PRODUCT_UPDATE_FAILED,
      };
    }
    return {
      success: true,
      message: "Product update successfully!",
      data: updateProduct,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return {
        success: false,
        message: Exception.INVALID_OBJECT_ID,
      };
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true },
      { new: false }
    ).exec();
    if (updateProduct.isDeleted) {
      return {
        success: true,
        message: "Product was soft deleted",
        data: updateProduct,
      };
    }
    if (!updateProduct) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getProductById = async (id) => {
  try {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) {
      return {
        success: false,
        message: Exception.INVALID_OBJECT_ID,
      };
    }
    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).exec();
    if (!product) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Get product by ID found",
      data: product,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};
const getProductByCategories = async (categories) => {
  try {
    if (!Array.isArray(categories)) {
      return {
        success: false,
        message: Exception.INVALID_INPUT_TYPE,
      };
    }
    const foundProduct = await Product.find({
      productCategory: { $in: categories },
    }).exec();

    if (!foundProduct) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }

    return {
      success: true,
      message: `Found product(s) in categories [${categories.join(", ")}]`,
      data: foundProduct,
    };
  } catch (exception) {
    throw new Exception(exception.message);
  }
};

const getProductHasDiscount = async (startDate,expiredDate,getAllDiscounts = false) => {
  try {
    if (isNaN(startDate.getTime()) || isNaN(expiredDate.getTime())) {
      return {
        success: false,
        message: Exception.INVALID_INPUT_TYPE,
      };
    }
    let products;
    if(!getAllDiscounts){
       products = await Product.find({
        "productDiscount.isActive": true,
        $or: [
          {
            "productDiscount.discountStartDate": { $lte: startDate },
            "productDiscount.discountExpiredDate": { $gte: startDate },
          },
          {
            "productDiscount.discountStartDate": { $lte: expiredDate },
            "productDiscount.discountExpiredDate": { $gte: expiredDate },
          },
        ],
      });
    } else {
       products = await Product.find({
        "productDiscount.isActive": true,
      });
    }

    if (products.length === 0 ) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: constants.PRODUCT_RETRIVED,
      data: products,
    };
  } catch (error) {
    console.log("lmeo")
    console.error("Error getting products with discount:", error.message);
    throw error;
  }
}

export default {
  createNewProduct,
  searchProductsByName,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductByCategories,
  getProductHasDiscount
};
