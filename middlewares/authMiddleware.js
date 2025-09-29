// /
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token =
      (req.cookies && req.cookies.token) ||
      req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
        status: "failed",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          status: "failed",
        });
      }
      req.user = decoded; // 👈 user info (id, email, role)
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error in token verification",
      error: err.message,
    });
  }
};

// Role-based middleware
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
        status: "failed",
      });
    }
    next();
  };
};

// ✅ Only Admins
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admins only.",
      status: "failed",
    });
  }
  next();
};

// ✅ Only Users
const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "Access denied. Users only.",
      status: "failed",
    });
  }
  next();
};

export default {
  verifyToken,
  checkRole,
  isAdmin,
  isUser,
};
