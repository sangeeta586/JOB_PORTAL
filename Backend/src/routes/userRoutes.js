import express from "express";
import { createUser, userLogin } from "../controller/userController.js";
import userAuth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);

export default router;
