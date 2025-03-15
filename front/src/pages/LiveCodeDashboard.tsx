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

import FileCards from "@/components/RoomCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";

const LiveCodeDashboard = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  const createRoom = async (formData: { file_name: string }) => {
    // console.log("file name : ", formData.file_name);
    // console.log("lang : ", selectedLanguage);
    if (!formData.file_name || !selectedLanguage) {
      alert("File name and langauge are required!!!");
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/rooms/create-room",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: formData.file_name,
            language: selectedLanguage,
            createdBy: user._id,
          }),
        }
      );
      console.log("Showing Response : ");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Room created successfully:", data);
        navigate(
          `/live-code/${data.room.roomId}?lang=${selectedLanguage}&filename=${formData.file_name}`
        );
      } else {
        console.error("Error creating room:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create room.");
    }
  };

  const joinRoom = async (formData: { room_id: string }) => {
    if (!formData.room_id) {
      alert("Room id needed!!!");
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/rooms/join-room/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: formData.room_id,
            userId: user._id,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate(`/live-code/${data.room.roomId}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to join room.");
    }
  };

  const deleteRoom = (formData: { delete_room_id: string }) => {
    // console.log("Deleting room:", formData.delete_room_id);
    // we need to figure the delete room logic bruh
  };
  const sampleFiles = [
    {
      filename: "index.html",
      fileType: "html",
      createdAt: "2025-02-15T14:32:00",
    },
    {
      filename: "styles.css",
      fileType: "css",
      createdAt: "2025-02-20T09:15:00",
    },
    {
      filename: "app.js",
      fileType: "javascript",
      createdAt: "2025-03-01T16:45:00",
    },
  ];

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
                id: "file_name",
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
            <FileCards files={sampleFiles} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LiveCodeDashboard;
