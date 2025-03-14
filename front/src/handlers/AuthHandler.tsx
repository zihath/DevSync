import LoaderPage from "@/views/LoaderPage";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { setUser } from "@/store/userSlice";
import { AppDispatch } from "@/store/appStore";

const AuthHandler = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const existingUser = await response.json();
          dispatch(setUser(existingUser)); // let's store existing user in our appStore
          console.log("User already exists, skipping creation.");
          return;
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
          "http://localhost:3000/api/users/create-user",
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
        console.log("User creation response:", res);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user, dispatch]);

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return;
};

export default AuthHandler;
