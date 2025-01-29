import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { BACKEND_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";
import axios from "axios";

type Room = {
  id: number;
  slug: string;
};
const getRooms = async (token: string | null) => {
  if (!token) {
    return [];
  }
  try {
    const response = await axios.get(`${BACKEND_URL}/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export async function RoomList() {
  const token = await getVerifiedToken();
  const rooms: Room[] = await getRooms(token);
  return (
    <ul className="space-y-2">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded"
        >
          <span>{room.slug}</span>
          <Button asChild variant="outline">
            <Link href={`/canvas/${room.id}`}>Join</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
