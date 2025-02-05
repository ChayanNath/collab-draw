"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { getVerifiedToken } from "@/lib/cookie";

type Room = {
  id: number;
  slug: string;
  createdAt: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const token = await getVerifiedToken();
      const response = await axios.get(`${BACKEND_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setRooms(response.data.rooms);
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">
            Your Drawing Rooms
          </h1>
          <Button onClick={() => router.push("/create-room")}>
            <Plus className="mr-2 h-4 w-4" />
            New Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-card-foreground">
                  {room.slug}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Created {new Date(room.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => router.push(`/canvas/${room.id}`)}
                >
                  Join Room
                </Button>
              </CardContent>
            </Card>
          ))}

          {rooms.length === 0 && (
            <Card className="col-span-full bg-muted/50">
              <CardHeader className="text-center">
                <CardTitle className="text-card-foreground">
                  No Rooms Yet
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Create your first drawing room to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => router.push("/create-room")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Room
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
