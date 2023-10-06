import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "./config/config.js";

cloudinary.config(cloudinaryConfig.cloudinary);

const deleteImageFromCloudinary = async (publicUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      const publicId = getPublicIdFromUrl(publicUrl);

      if (!publicId) {
        reject(new Error("Invalid public URL"));
        return;
      }
      console.log(publicId)
      const deletionResult = await cloudinary.uploader.destroy(publicId);
      if (deletionResult.result === "ok") {
        console.log("Image deleted successfully");
      } else {
        console.log("Failed to delete image from Cloudinary");
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
deleteImageFromCloudinary(
  "https://res.cloudinary.com/dotknkcep/image/upload/v1696329362/Product-Image/kipmtox4qge48ncj7bj4.jpg"
);
