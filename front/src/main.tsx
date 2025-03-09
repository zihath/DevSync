import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ThemeProvider } from "@/components/theme-provider";

import { Provider } from "react-redux";
import appStore from "./store/appStore.ts";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const LIVEBLOCKS_PUBLIC_KEY = import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={appStore}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ClerkProvider
          appearance={{
            baseTheme: neobrutalism,
          }}
          publishableKey={PUBLISHABLE_KEY}
        >
          <LiveblocksProvider publicApiKey={LIVEBLOCKS_PUBLIC_KEY}>
            <App />
          </LiveblocksProvider>
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
