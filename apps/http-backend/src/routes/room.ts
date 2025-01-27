import express, { Router } from "express";
import { createRoom, getRoom, getAllRooms } from "../controllers/room";

const router: Router = express.Router();

router.get("/", getAllRooms);
router.post("/create-room", createRoom);
router.get("/:slug", getRoom);

export default router;
