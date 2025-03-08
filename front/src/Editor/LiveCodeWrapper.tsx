import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import LoaderPage from "../views/LoaderPage";
import LiveCode from "./LiveCode";

const LiveCodeWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [inputRoomId, setInputRoomId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const existingRoomId = queryParams.get("room");

    if (existingRoomId) {
      setRoomId(existingRoomId);
    }
  }, [location.search]);

  const createRoom = () => {
    const newRoomId = crypto.randomUUID();
    navigate(`/live-code?room=${newRoomId}`, { replace: true });
    setRoomId(newRoomId);
  };

  const joinRoom = () => {
    if (inputRoomId.trim()) {
      navigate(`/live-code?room=${inputRoomId.trim()}`, { replace: true });
      setRoomId(inputRoomId.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!roomId ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={createRoom}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Create Room
          </button>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="px-3 py-2 border rounded-md"
            />
            <button
              onClick={joinRoom}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <RoomProvider id={roomId}>
          <ClientSideSuspense fallback={<LoaderPage />}>
            <LiveCode />
          </ClientSideSuspense>
        </RoomProvider>
      )}
    </div>
  );
};

export default LiveCodeWrapper;
