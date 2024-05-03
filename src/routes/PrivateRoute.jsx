import { Outlet, Navigate } from "react-router-dom";
// import useCookie from "../userContext/UserContext";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function PrivateRoutes() {
  const token = getCookie("accessToken");
  // const cookieValue = useCookie();
  // const token = cookieValue.cookie;

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
