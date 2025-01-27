import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";

type Room = {
  id: number;
  name: string;
};
const getRooms = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/rooms`);
    console.log("Response:", response);
    return response.data.rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export async function RoomList() {
  const rooms: Room[] = await getRooms();
  return (
    <ul className="space-y-2">
      {rooms.map((room) => (
        <li
          key={room.id}
          className="flex items-center justify-between bg-gray-100 p-3 rounded"
        >
          <span>{room.name}</span>
          <Button asChild variant="outline">
            <Link href={`/room/${room.id}`}>Join</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
