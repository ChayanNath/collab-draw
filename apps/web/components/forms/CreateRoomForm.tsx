"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export function CreateRoomForm() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating room:", roomName);
    try {
      await axios.post(`${BACKEND_URL}/room/create-room`, { name: roomName });
      router.push(`/room/${encodeURIComponent(roomName)}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="roomName">Room Name</Label>
        <Input
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Room</Button>
    </form>
  );
}
