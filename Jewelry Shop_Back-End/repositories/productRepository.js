import cloudinaryService from "../services/cloudinaryService.js";
import ConfigConstants from "../constant/ConfigConstants.js";
import SuccessConstants from "../constant/SuccessConstants.js";
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
      ConfigConstants.CLOUDINARY_PRODUCT_IMG
    );
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
    // query.isDeleted = false;
    const searchResult = await Product.find(query).exec();
    if (!searchResult || searchResult.length === 0) {
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

const getAllProducts = async (category,color,material,minPrice,maxPrice,sort,page = 1,limit = Number.MAX_SAFE_INTEGER,isDeleted = false,searchName) => {
  try {
    const query = {};
    query.isDeleted = isDeleted;
    if(searchName){
      query.$or = [
        { productName: new RegExp(searchName, "i") },
      ];
    }
    if(searchName){
      query.$or = [
        { productName: new RegExp(searchName, "i") },
      ];
    }
    if (color && color.length > 0) {
      query.productColors = { $in: color };
    }

    if (material && material.length > 0) {
      query.productMaterials = { $in: material };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      query.productPrice = { $gte: minPrice, $lt: maxPrice };
    }

    if (category) {
      query.productCategory = category;
    }
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) {
      return {
        success: false,
        message: "Invalid page value. Page must be a positive integer.",
      };
    }

    if (isNaN(limit) || limit < 1) {
      return {
        success: false,
        message: "Invalid limit value. Limit must be a positive integer.",
      };
    }

    let skip;
    if(page && limit) {
      skip = (page - 1) * limit;
    }
    const getAllProducts = await Product.find(query).sort(sort).skip(skip).limit(limit).exec();
    const totalPages =  Math.ceil( await Product.find(query).countDocuments().exec() / limit);

    if (!getAllProducts || getAllProducts.length === 0) {
      return {
        success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      };
    }
    return {
      success: true,
      message: "Get all product successfully!",
      data: {
        products: getAllProducts,
        totalPages: totalPages,
      },
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
            ConfigConstants.CLOUDINARY_PRODUCT_IMG
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
      message: SuccessConstants.PRODUCT_RETRIVED,
      data: products,
    };
  } catch (error) {
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
