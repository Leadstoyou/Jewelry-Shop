import cloudinaryService from "../services/cloudinaryService.js";

import constants from "../constant/constants.js";
const createNewProduct = async (
  productName,
  productDescription,
  productQuantity,
  productSizes,
  productMaterials,
  productCategory,
  productDiscount,
  productImage
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await cloudinaryService.uploadProductImageToCloudinary(
        "https://i.pinimg.com/736x/f4/68/ea/f468ea1e8a22dcac67f8d8fc29b58ca1.jpg",
        constants.CLOUDINARY_USER_AVATAR_IMG
      );
    } catch (error) {
      reject(error);
    }
  });
};
createNewProduct();
