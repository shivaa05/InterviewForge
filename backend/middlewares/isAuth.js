import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const {token} = req.cookies;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found",
      });
    }

    const isAuthenticated = jwt.verify(token, process.env.JWT_SECRET);
    if (!isAuthenticated) {
      return res.status(403).json({
        success: false,
        message: "User not authenticated",
      });
    }
    req.userId = isAuthenticated.userId;
    next();
  } catch (error) {
    console.log(error)
    console.log("Error in isAuth middleware");
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuth;
