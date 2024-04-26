import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const token = Cookies.get("accessToken");
  console.log(token, "pvtoken");
  return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoutes;
