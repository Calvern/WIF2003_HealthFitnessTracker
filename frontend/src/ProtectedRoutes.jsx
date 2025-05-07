import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppContext();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
