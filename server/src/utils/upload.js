import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'

dotenv.config()
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async(localFilePath) => {
try {
    if(!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto'
    })

    console.log("File uploaded successfully...", response.url);
    fs.unlinkSync(localFilePath)

    return response
    
} catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
}
}

export const deleteCloudinaryImage = async (imageId) => {
  try {
    const destroyImage = await cloudinary.uploader.destroy(imageId);

    if (destroyImage.result === "ok") {
      console.log("Image deleted successfully....");
    } else {
      console.log("Error occur while deleting the image");
    }

    return destroyImage;
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Error occur while deleting the image");
  }
};


export default uploadOnCloudinary;