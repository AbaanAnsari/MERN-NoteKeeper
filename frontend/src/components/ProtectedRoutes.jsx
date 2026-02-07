import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user, loadingUser } = useAuth();

  // Wait until we know if user exists
  if (loadingUser) return null;

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
};

export default ProtectedRoutes;
