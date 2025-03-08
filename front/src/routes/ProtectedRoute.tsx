import LoaderPage from "@/views/LoaderPage";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  console.log(user);
  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
