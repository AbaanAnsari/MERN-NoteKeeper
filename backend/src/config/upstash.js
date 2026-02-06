import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dotenv from "dotenv";
dotenv.config();    

//creating a ratelimiter
const ratelimit = new Ratelimit ({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per 1 min
})

export default ratelimit;   