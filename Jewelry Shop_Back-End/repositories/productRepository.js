import cloudinaryService from "../services/cloudinaryService.js";
<<<<<<< HEAD

import constants from "../constant/constants.js";
=======
import constants from "../constant/constants.js";
import { Product } from "../models/indexModel.js";
import Exception from "../constant/Exception.js";
import mongoose from "mongoose";

>>>>>>> main
const createNewProduct = async (
  productName,
  productDescription,
  productQuantity,
  productSizes,
<<<<<<< HEAD
=======
  productPrice,
  productColors,
>>>>>>> main
  productMaterials,
  productCategory,
  productDiscount,
  productImage
) => {
  return new Promise(async (resolve, reject) => {
<<<<<<< HEAD
    try {
    cloudinaryService.uploadProductImageToCloudinary(
        "https://i.pinimg.com/736x/f4/68/ea/f468ea1e8a22dcac67f8d8fc29b58ca1.jpg",
        constants.CLOUDINARY_USER_AVATAR_IMG
    )
=======
    let productImageUrl;
    try {
      const dupicateProductName = await Product.findOne({ productName }).exec();
      if (!!dupicateProductName) {
        reject(new Exception(Exception.PRODUCT_EXIST));
      } else {
        productImageUrl =
          await cloudinaryService.uploadProductImageToCloudinary(
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
        resolve({
          ...newProduct._doc,
        });
      }
    } catch (error) {
      if (productImageUrl) {
        cloudinaryService.deleteImageFromCloudinary(productImageUrl);
      }
      reject(error);
    }
  });
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

    return searchResult;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

const getAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAllProducts = await Product.find({}).exec();

      resolve(getAllProducts);
>>>>>>> main
    } catch (error) {
      reject(error);
    }
  });
<<<<<<< HEAD
}
createNewProduct()
=======
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
  return new Promise(async (resolve, reject) => {
    try {
      let productImageUrl = null;
      if (productImage) {
        productImageUrl =
          await cloudinaryService.uploadProductImageToCloudinary(
            productImage,
            constants.CLOUDINARY_PRODUCT_IMG
          );
      }
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
          ...(productImageUrl && { productImage: productImageUrl }),
          ...(isDeleted !== undefined && { isDeleted }),
        },
        { new: true }
      ).exec();
      resolve({
        ...updateProduct._doc,
      });
    } catch (error) {
      reject(error);
    }
  });
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
>>>>>>> main
