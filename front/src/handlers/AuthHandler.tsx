import LoaderPage from "@/views/LoaderPage";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AuthHandler = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return;
};

export default AuthHandler;
