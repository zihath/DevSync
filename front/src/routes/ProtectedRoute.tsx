import AuthHandler from "@/handlers/AuthHandler";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <div>
      <AuthHandler />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
