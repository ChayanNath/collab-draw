import { prismaClient } from "@workspace/db/client";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@workspace/backend-common/config";

const wss = new WebSocketServer({ port: 8000 });

type User = {
  userId: string;
  ws: WebSocket;
  rooms: number[];
};

const users: User[] = [];

function checkUser(token: string): string | null {
  const decodedToken = jwt.verify(token, JWT_SECRET);
  if (typeof decodedToken === "string") {
    return null;
  }
  if (!decodedToken || !decodedToken.userId) {
    return null;
  }
  return decodedToken.userId;
}

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) {
    return ws.close();
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  if (!token) {
    return ws.close();
  }
  const userId = checkUser(token);
  if (!userId) {
    return ws.close();
  }

  users.push({ userId, ws, rooms: [] });

  ws.on("message", async (message) => {
    const data = JSON.parse(message as unknown as string);
    if (data.type === "join") {
      const roomId = data.roomId;
      if (!roomId) {
        return ws.close();
      }
      const userRoom = users.find((user) => user.ws === ws);
      if (!userRoom) {
        return ws.close();
      }
      userRoom.rooms.push(roomId);
      ws.send(JSON.stringify({ type: "join", roomId }));
    }

    if (data.type === "leave") {
      const roomId = data.roomId;
      if (!roomId) {
        return;
      }
      const userRoom = users.find((user) => user.ws === ws);
      if (!userRoom) {
        return;
      }
      userRoom.rooms = userRoom.rooms.filter((id) => id !== roomId);
      ws.send(JSON.stringify({ type: "leave", roomId }));
    }

    if (data.type === "chat") {
      const roomId = data.roomId;
      const message = data.message;

      if (!roomId || !message) {
        return;
      }

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({ type: "chat", message, roomId }));
        }
      });
    }
  });
});
