import ratelimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => { 
    try {
        const { success } = await ratelimit.limit("my-rate-limit")// It can be replaced with IP or any unique identifier like user id
        
        if(!success){
            return res.status(429).json({
                success: false,
                message: "Too many requests, please try again later."
            })
        }
        next();
    } catch (error) {
        console.log("Ratelimiter middleware error:", error)
        next(error);                
    }
}

export default rateLimiter;