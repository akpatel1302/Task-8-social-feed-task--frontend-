import { Outlet, Navigate } from "react-router-dom";

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

function PublicRoutes() {
  const token = getCookie("accessToken");
  console.log(token);

  // if (!token) {
  //   return <></>; // or loading indicator if needed
  // }

  return !token ? <Outlet /> : <Navigate to="/home" replace />;
}

export default PublicRoutes;
