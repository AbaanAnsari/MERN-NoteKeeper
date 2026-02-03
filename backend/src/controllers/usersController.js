
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Get Users
export async function getAllUsers(req, res) { 
    try {
    const users = await User.find().sort({ createdAt: -1 });  //sort({ createdAt: -1 }) to get latest users first
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }

}


//Create Account
export async function createAccount(req, res){
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exist"
        })
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign(
        { user }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registeration Successfull"
    })
};


//Login User
export async function loginUser(req, res){
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" })
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "36000m"
        });

        return res.json({
            error: false,
            message: "Login Successfull",
            email,
            accessToken,
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"

        })
    }

}