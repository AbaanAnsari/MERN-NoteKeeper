import express from "express";
import { getAllUsers, createAccount, loginUser, logoutUser, refreshAccessToken } from "../controllers/usersController.js";
import authenticateToken from "../middleware/authorization.js";

const router = express.Router();

router.get("/", getAllUsers)
router.post("/signup", createAccount);
router.post("/login", loginUser);

//Secured Routes
router.post("/logout", authenticateToken, logoutUser);
router.post("/refresh-token", refreshAccessToken)

export default router;