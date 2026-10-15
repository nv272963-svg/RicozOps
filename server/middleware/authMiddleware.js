const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    console.log("Headers =>", req.headers);

    const authHeader = req.headers.authorization;

    console.log("Authorization =>", authHeader);
    console.log("JWT Secret =>", process.env.JWT_SECRET);

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No Token."
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token =>", token);

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded =>", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("JWT ERROR =>", err);

        return res.status(401).json({
            success: false,
            message: "Token Expired or Invalid"
        });

    }

};

module.exports = verifyToken;