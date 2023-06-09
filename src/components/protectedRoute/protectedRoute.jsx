import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const currRole = useSelector((state) => state.user.user.role);
  // console.log("from protec = ", currRole);
  return currRole === "SOCIAL_WORKER" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
