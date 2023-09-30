import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/config.js";

cloudinary.config(cloudinaryConfig.cloudinary);

const uploadProductImageToCloudinary = async (imagePath, folder, callback) => {
  await cloudinary.uploader.upload(
    imagePath,
    {
      folder: folder,
    },
    (error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } else {
        return result.secure_url;
      }
      if (callback) {
        callback(error, result);
      }
    }
  );
};

export default {
  uploadProductImageToCloudinary,
};
