// const JWT_SECRET = "thisismysamplejwtsecreticankeeepitaslargeasiwantanythingicanwritehereS"
// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     const authHeader = req.header("Authorization");
//     if (!authHeader) {
//         return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     try {
//         const token = authHeader.split(" ")[1]; 
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

