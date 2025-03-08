import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import LoaderPage from "../views/LoaderPage";
import LiveCode from "./LiveCode";
import LiveCodeDashboard from "@/pages/LiveCodeDashboard";

const LiveCodeWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const existingRoomId = queryParams.get("room");
    const selectedLang = queryParams.get("lang");

    if (existingRoomId) {
      setRoomId(existingRoomId);
    }
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!roomId ? (
        <LiveCodeDashboard />
      ) : (
        <RoomProvider id={roomId}>
          <ClientSideSuspense fallback={<LoaderPage />}>
            <LiveCode language={language} onBack={<LiveCodeDashboard />} />
          </ClientSideSuspense>
        </RoomProvider>
      )}
    </div>
  );
};

export default LiveCodeWrapper;
