import { CreateRoomSchema } from "@workspace/common/types";
import { prismaClient } from "@workspace/db/client";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }
    const safeParsedData = data.data;
    const userId = req.user;
    console.log(userId);
    if (!userId || !safeParsedData.name) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }

    const existingRoom = await prismaClient.room.findUnique({
      where: {
        slug: safeParsedData.name,
      },
    });

    if (existingRoom) {
      res
        .status(400)
        .json({ message: "Room already exists! Provide a different name" });
      return;
    }
    const room = await prismaClient.room.create({
      data: {
        slug: safeParsedData.name,
        adminId: userId,
      },
    });
    res
      .status(201)
      .json({ message: "Room created successfully", roomId: room.id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export const getRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }
    const room = await prismaClient.room.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!room) {
      res.status(400).json({ message: "Room not found" });
      return;
    }
    res.status(200).json({ message: "Room retrieved successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export const getAllRooms = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const rooms = await prismaClient.room.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(rooms);
    res.status(200).json({ message: "Rooms retrieved successfully", rooms });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
