import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import Modal from "@/components/Modal";
import SelectProgrammingLanguages from "@/components/SelectProgammingLanguages";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const LiveCodeDashboard = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const createRoom = (formData: { room_name: string }) => {
    const newRoomId = crypto.randomUUID();
    navigate(`/live-code?room=${newRoomId}&lang=${selectedLanguage}`);
  };

  const joinRoom = (formData: { room_id: string }) => {
    if (formData.room_id.trim()) {
      navigate(`/live-code?room=${formData.room_id}`);
    }
  };

  const deleteRoom = (formData: { delete_room_id: string }) => {
    console.log("Deleting room:", formData.delete_room_id);
    // we need to figure the delete room logic bruh
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <Modal
            buttonName="Create Room"
            modalTitle="Create a New Room"
            modalDescription="Enter details to create a new room."
            fields={[
              {
                label: "File Name",
                id: "room_name",
                placeholder: "Enter file name",
              },
            ]}
            onSubmit={createRoom}
          >
            <SelectProgrammingLanguages onSelect={setSelectedLanguage} />
          </Modal>

          <Modal
            buttonName="Join Room"
            modalTitle="Join a Room"
            modalDescription="Enter the room ID to join."
            fields={[
              { label: "Room ID", id: "room_id", placeholder: "Enter room ID" },
            ]}
            onSubmit={joinRoom}
          />

          <Modal
            buttonName="Delete Room"
            modalTitle="Delete a Room"
            modalDescription="Enter the room ID to delete."
            fields={[
              {
                label: "Room ID",
                id: "delete_room_id",
                placeholder: "Enter room ID",
              },
            ]}
            onSubmit={deleteRoom}
          />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {" "}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LiveCodeDashboard;
