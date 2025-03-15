import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react";
import LoaderPage from "@/views/LoaderPage";
import LiveCodeEditor from "./LiveCodeEditor";
import LiveCodeDashboard from "../pages/LiveCodeDashboard";

const LiveCodeWrapper = () => {
  const { roomId } = useParams();
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (roomId) setIsValid(true);
  }, [roomId]);

  return (
    <div className="flex flex-col h-screen bg-editor-background mb-0">
      {isValid ? (
        <RoomProvider id={roomId!} initialPresence={{ cursor: null }}>
          <ClientSideSuspense fallback={<LoaderPage />}>
            <LiveCodeEditor />
          </ClientSideSuspense>
        </RoomProvider>
      ) : (
        <LiveCodeDashboard />
      )}
    </div>
  );
};

export default LiveCodeWrapper;
