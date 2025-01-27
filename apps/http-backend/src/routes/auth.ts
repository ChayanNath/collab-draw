import express, { Router } from "express";
import { signin, signup, getUser } from "../controllers/auth";
import authMiddleware from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/me", authMiddleware, getUser);

export default router;
