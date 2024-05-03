import Home from "@pages/Home";
import "./App.css";
import Signin from "./pages/SignIn";
import Signup from "./pages/Signup";
import { RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoutes from "./routes/PublicRoute";
import Profile from "./pages/Profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "*",
        element: <Signin />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
