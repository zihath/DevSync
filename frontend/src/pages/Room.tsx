"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useAuth } from "@clerk/clerk-react";

interface RoomProps {
  id: string; // Room ID as a prop
  children: ReactNode;
}

export function Room({ id, children }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint="http://localhost:5000/api/liveblocks-auth">
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
