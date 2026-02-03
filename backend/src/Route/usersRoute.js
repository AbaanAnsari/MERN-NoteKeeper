import express from "express";
import { loginUser, createAccount, getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers)
router.post("/signup", createAccount);
router.post("/login", loginUser);

export default router;