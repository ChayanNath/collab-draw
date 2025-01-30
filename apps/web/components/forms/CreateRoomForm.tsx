"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";

export function CreateRoomForm() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/rooms/create-room`,
        { name: roomName },
        {
          headers: {
            Authorization: `Bearer ${await getVerifiedToken()}`,
          },
        }
      );
      router.push(`/canvas/${encodeURIComponent(response.data.roomId)}`);
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
      <Button type="submit" onClick={handleSubmit}>
        Create Room
      </Button>
    </form>
  );
}
