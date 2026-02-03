import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function authenticateToken(req, res, next) {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Invalid Access Token"
            })
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

}

export default authenticateToken