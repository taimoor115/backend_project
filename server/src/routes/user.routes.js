import { Router } from "express";

import { upload } from "../middleware/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
// secured route
router.route("/logout").post(verifyJWT, logoutUser);
export default router