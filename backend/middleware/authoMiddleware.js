

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
    try {
        // Extract the token from the `Authorization` header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, error: "Token not provided or invalid" });
        }

        const token = authHeader.split(" ")[1]; // Extract the token

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return res.status(401).json({ success: false, error: "Token is not valid" });
        }

        // Find the user by ID
        const user = await User.findById(decoded._id).select("-password"); // Exclude the password field
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

module.exports = verifyUser;
