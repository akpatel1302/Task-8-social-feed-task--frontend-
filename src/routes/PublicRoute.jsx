// import { Outlet, Navigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthWrapper";

// function PublicRoutes() {
//   const token = true;

//   if (token === null) {
//     return null; // or loading indicator if needed
//   }

//   return token ? <Navigate to="/contact" replace /> : <Outlet />;
// }

// export default PublicRoutes;

import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";

function PublicRoutes() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("");
        setToken(response.data.token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  if (token === null) {
    return <div>Loading...</div>; // or loading indicator if needed
  }

  return token ? <Navigate to="/contact" replace /> : <Outlet />;
}

export default PublicRoutes;

