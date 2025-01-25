import { prismaClient } from "@workspace/db/client";
import { Request, Response } from "express";

export const getChat = async (req: Request, res: Response): Promise<any> => {
  try {
    const roomId = Number(req.params.roomId);
    if (!roomId) {
      res.status(400).json({ message: "Invalid request" });
      return;
    }
    const chats = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      take: 100,
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json({ message: "Chat retrieved successfully", chats });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
