const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    //remove this as we are taking token from cookies so we dont have authorization header

    // now follow me :ok i   const token = req.cookies.token

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //here we dont need to split token as we dont have bearer attached in front

        //done now lets go to server.js
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

