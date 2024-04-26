import Home from "@pages/Home";
import "./App.css";
import Signin from "./pages/SignIn";
import Signup from "./pages/Signup";
import { RouterProvider } from "react-router-dom";
// import PrivateRoute from "./routes/PrivateRoute";
// import PublicRoutes from "./routes/PublicRoute";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    // element: <PublicRoutes />,
    children: [
      {
        path: "/",
        index: true,
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "*",
        element: <Signin />,
      },
    ],
  },
  // {
  //   // path: "/contact",
  //   element: <PrivateRoute />,
  //   children: [
  //     {
  //       path: "/contact",
  //       element: <Contact />,
  //     },
  //     {
  //       path: "*",
  //       element: <Contact />,
  //     },
  //   ],
  // },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
