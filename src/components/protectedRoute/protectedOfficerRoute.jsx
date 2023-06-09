import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedOfficerRoute = () => {
  const currRole = useSelector((state) => state.user.user.role);
  return currRole === "MANAGER" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedOfficerRoute;
