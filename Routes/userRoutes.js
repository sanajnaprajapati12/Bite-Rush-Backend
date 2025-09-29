import express from "express";
import userController from "../Controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
const { verifyToken, checkRole } = auth;

const router = express.Router();

// Public routes
router.post("/register",
    userController.createUser);
router.post("/login"

  , userController.loginUser);

// Protected + Admin routes
router.get(
  "/getAlluser",
  verifyToken,
  checkRole(["owner", "admin"]),
  userController.getAllUsers
);
router.put(
  "/updateUserRole/:userId",
  verifyToken,
  checkRole([ "owner", "admin"]),
  userController.updateUserRole
);
router.delete(
  "/deleteUser/:userId",
  verifyToken,
  checkRole([  "owner","admin"]),
  userController.deleteUser
);

export default router;
