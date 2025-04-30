import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/getToken";
const ProtectedRoute = () => {
  const accessToken = getToken();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
