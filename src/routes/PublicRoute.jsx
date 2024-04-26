import { Outlet, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

function PublicRoutes() {
  
  const token = Cookies.get("accessToken")  ;

  if (token === null) {
    return null; // or loading indicator if needed
  }

  return token ? <Outlet /> : <Navigate to="/home" replace />;
}

export default PublicRoutes;
