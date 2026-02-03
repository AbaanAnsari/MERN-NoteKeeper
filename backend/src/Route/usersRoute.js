import express from "express";
import { loginUser, createAccount, getAllUsers, LogoutUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers)
router.post("/signup", createAccount);
router.post("/login", loginUser);
router.post("/logout", LogoutUser);

export default router;