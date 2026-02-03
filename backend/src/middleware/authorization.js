import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
    const authHeader = await req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

export default authenticateToken