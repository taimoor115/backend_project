import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/upload.js";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

  const {username, email, fullname, password} = req.body;

  if([fullname, email, username, password].some((field) => field.trim === "")) {
    return new ApiError(400,"All fields are required")
  }
  const existedUser = await User.findOne({
    $or: [{email}, {username}]
  });

  if(existedUser) {
    return new ApiError(400,"User already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath) {
    return new ApiError("400", "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if(!avatar) {
    return new ApiError("400", "Avatar is required")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);


  const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser) {
    return new ApiError(500, "Something went wrong while creating user")
  }


  return res.status(201).json(
    new ApiResponse(201, "User created Successfully")
  )

})

