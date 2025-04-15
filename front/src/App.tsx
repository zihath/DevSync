import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import the Toaster component
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import PublicLayout from "./layouts/public-layout";
import HomePage from "./routes/HomePage";
import SingInPage from "./routes/SingInPage";
import SingUpPage from "./routes/SingUpPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LiveCodeDashboard from "./pages/LiveCodeDashboard";
import LiveCodeWrapper from "./Editor/LiveCodeWrapper";
import ProjectDashboard from "./pages/ProjectDashboard";
import ProjectEditor from "./PenCodeEditor/ProjectEditor";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { AppDispatch } from "./store/appStore";
const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://devsync-taek.onrender.com/api/users", {
          method: "GET",
          credentials: "include",
        });
        console.log("at auth handler response of fetch user");

        const res = await response.json();
        console.log("res", res);
        if (res.message == "User found") {
          console.log("User already exists, skipping creation.");
          dispatch(setUser(res.user));
        } else {
          console.log("User not found, creating user...");
          await createUser();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const createUser = async () => {
      if (!user) return;
      try {
        // If user not found, create the user and update in db
        const response = await fetch(
          "https://devsync-taek.onrender.com/api/users/create-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            // sending the details from the clerk user object to backend.
            // we can replace the clerk with custom signup in future.
            body: JSON.stringify({
              username: user.fullName,
              email: user.primaryEmailAddress?.emailAddress,
            }),
          }
        );

        const res = await response.json();
        dispatch(setUser(res.user));
        console.log("User creation response:", res.user);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user, dispatch]);
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SingInPage />} />
          <Route path="/sign-up" element={<SingUpPage />} />

          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/live-code" element={<LiveCodeDashboard />} />
            <Route path="/live-code/:roomId" element={<LiveCodeWrapper />} />
            <Route
              path="/project-dashboard"
              element={<ProjectDashboard />}
            ></Route>
            <Route
              path="/project-editor/:projectId"
              element={<ProjectEditor />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
