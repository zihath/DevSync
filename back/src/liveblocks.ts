import { Liveblocks } from "@liveblocks/node";
const LIVEBLOCKS_SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET_KEY || "",
});

export default liveblocks;
