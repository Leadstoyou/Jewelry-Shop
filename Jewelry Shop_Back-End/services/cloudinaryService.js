import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/config.js";

cloudinary.config(cloudinaryConfig.cloudinary);

function uploadProductImageToCloudinary(imagePath, folder, callback) {
  cloudinary.uploader.upload(
    imagePath,
    {
      folder: folder,
    },
    (error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
      } else {
        console.log(
          "Image uploaded successfully. Public URL:",
          result.secure_url
        );
      }

      if (callback) {
        callback(error, result);
      }
    }
  );
}

export default {
  uploadProductImageToCloudinary,
};
