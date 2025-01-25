import express, { Router } from "express";
import { getChat } from "../controllers/chat";

const router: Router = express.Router();

router.get("/:roomId", getChat);

export default router;
