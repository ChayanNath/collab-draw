import express, { Router } from "express";
import { createRoom } from "../controllers/room";

const router: Router = express.Router();

router.post("/create-room", createRoom);

export default router;
