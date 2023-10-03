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
      }
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
        { productDescription: new RegExp(searchTerm, "i") },
        { productColors: searchTerm },
        { productCategory: new RegExp(searchTerm, "i") },
        { productSizes: searchTerm },
      ],
    };

    const searchResult = await Product.find(query).exec();

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
  return new Promise(async (resolve, reject) => {
    try {
      const getAllProducts = await Product.find({}).exec();

      resolve(getAllProducts);
    } catch (error) {
      reject(error);
    }
  });
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
  let productImageUrl;
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
        ...(productImageUrl && { productImage: await cloudinaryService.uploadProductImageToCloudinary(
          productImage,
          constants.CLOUDINARY_PRODUCT_IMG
        ) }),
        ...(isDeleted !== undefined && { isDeleted }),
      },
      { new: true }
    ).exec();
    if (!updateProduct) {
      return {
         success: false,
        message: Exception.PRODUCT_NOT_FOUND,
      }
    }
    return {
      success: true,
      message: "update product successfully!",
      data: updateProduct,
    };
  } catch (exception) {
    if (productImageUrl) {
      await cloudinaryService.deleteImageFromCloudinary(productImageUrl);
    }
    throw new Exception(exception.message);
  }
};

const deleteProduct = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidObjectId) {
        reject(new Error("Invalid ObjectId"));
        return;
      }

      const updateProduct = await Product.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { isDeleted: true },
        { new: false }
      ).exec();
      if (updateProduct.isDeleted) {
        reject(new Error("Product was soft deleted"));
      }
      if (!updateProduct) {
        reject(new Error("Product not found"));
        return;
      }
      resolve({
        ...updateProduct._doc,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  createNewProduct,
  searchProductsByName,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
