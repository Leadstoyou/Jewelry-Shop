import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/config.js";

cloudinary.config(cloudinaryConfig.cloudinary);

const uploadProductImageToCloudinary = async (imagePath, folder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: folder,
      });

      resolve(result.secure_url);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      reject(error);
    }
  });
};
const deleteImageFromCloudinary = async (publicUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const publicId = getPublicIdFromUrl(publicUrl);

      if (!publicId) {
        reject(new Error("Invalid public URL"));
        return;
      }

      const deletionResult = await cloudinary.uploader.destroy(publicId);
      if (deletionResult.result === "ok") {
        resolve({ message: "Image deleted successfully" });
      } else {
        reject(new Error("Failed to delete image from Cloudinary"));
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      reject(error);
    }
  });
};

const getPublicIdFromUrl = (publicUrl) => {
  const urlParts = publicUrl.split('/');
  const baseIndex = urlParts.indexOf('upload') + 2; 
  const remainingPath = urlParts.slice(baseIndex).join('/');
  const publicId = remainingPath.split('.')[0];
  return publicId;
};

export default {
  uploadProductImageToCloudinary,
  deleteImageFromCloudinary,
};
