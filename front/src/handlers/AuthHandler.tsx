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
  const clerkId = user?.id;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const createUser = async () => {
      if (!user) return;

      try {
        // if user already exists we dont update in database
        const checkResponse = await fetch(
          `http://localhost:3000/api/users/${clerkId}`
        );
        if (checkResponse.ok) {
          const existingUser = await checkResponse.json();
          dispatch(setUser(existingUser)); // let's store existing user in our appStore
          console.log("User already exists, skipping creation.");
          return;
        }

        // If user not found, create the user and update in db
        const response = await fetch(
          "http://localhost:3000/api/users/create-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clerkId: user.id,
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
      createUser();
    }
  }, [user, dispatch, clerkId]);

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return;
};

export default AuthHandler;
