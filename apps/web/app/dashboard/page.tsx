import { CreateRoomForm } from "@/components/forms/CreateRoomForm";
import { RoomList } from "@/components/RoomList";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Create a New Room</h2>
          <CreateRoomForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Join Existing Rooms</h2>
          <RoomList />
        </div>
      </div>
    </div>
  );
}
