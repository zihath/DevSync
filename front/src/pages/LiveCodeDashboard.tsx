import { useEffect, useState } from "react";
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

import RoomCards from "@/components/RoomCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import {
  addCreatedRoom,
  addJoinedRoom,
  removeCreatedRoom,
} from "@/store/userSlice";
import { Button } from "@/components/ui/button";

const LiveCodeDashboard = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState("created");
  const [rooms, setRooms] = useState<any[]>([]);
  const dispatch = useDispatch();

  const createRoom = async (formData: { file_name: string }) => {
    // console.log("file name : ", formData.file_name);
    // console.log("lang : ", selectedLanguage);
    if (!formData.file_name || !selectedLanguage) {
      alert("File name and langauge are required!!!");
    }

    try {
      const response = await fetch(
        "https://devsync-taek.onrender.com/api/rooms/create-room",
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
      // console.log("Showing Response : ");
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Room created successfully:", data);
        dispatch(addCreatedRoom(data.room.roomId));
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

    // console.log("formData", formData);

    try {
      const response = await fetch(
        "https://devsync-taek.onrender.com/api/rooms/join-room/",
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
        dispatch(addJoinedRoom(data.room.roomId));
        navigate(`/live-code/${data.room.roomId}`);
        // navigate(
        // `/live-code/${data.room.roomId}?lang=${selectedLanguage}&`
        // );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to join room.");
    }
  };

  const deleteRoom = async (formData: { delete_room_id: string }) => {
    if (!formData.delete_room_id) {
      alert("Room ID is required!");
      return;
    }

    try {
      const response = await fetch(
        `https://devsync-taek.onrender.com/api/rooms/delete-room/${formData.delete_room_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch(removeCreatedRoom(formData.delete_room_id));

        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.roomId !== formData.delete_room_id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete room.");
    }
  };

  const fetchCreatedRooms = async () => {
    try {
      const response = await fetch(
        `https://devsync-taek.onrender.com/api/rooms/created-rooms/${user._id}`
      );
      const data = await response.json();
      if (response.ok) {
        setRooms(data.createdRooms);
      } else {
        console.error("Error fetching created rooms:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchJoinedRooms = async () => {
    try {
      const response = await fetch(
        `https://devsync-taek.onrender.com/api/rooms/joined-rooms/${user._id}`
      );
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        setRooms(data.joinedRooms);
      } else {
        console.error("Error fetching joined rooms:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "created") {
      fetchCreatedRooms();
    } else {
      console.log("fetching joined rooms");
      fetchJoinedRooms();
    }
  }, [activeTab, user._id]);

  // console.log("rooms", rooms);
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

          <Button onClick={() => setActiveTab("joined")}>Recent Rooms</Button>
          <Button onClick={() => setActiveTab("created")}>My Rooms </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <RoomCards
              rooms={rooms}
              joinRoom={joinRoom}
              deleteRoom={deleteRoom}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LiveCodeDashboard;
