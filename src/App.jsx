import Home from "@pages/Home";
import "./App.css";
import Signin from "./pages/SignIn";
import Signup from "./pages/Signup";
import { RouterProvider } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoutes from "./routes/PublicRoute";
import Profile from "./pages/Profile";
import {
  createBrowserRouter,
  //   createRoutesFromElements,
  //   RouterProvider,
  //   Route,
} from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<PublicRoutes />}>
//         <Route index element={<Signup />} />
//         <Route path="/signin" element={<Signin />} />
//       </Route>
//       <Route path="/home" element={<PrivateRoute />}>
//         <Route index element={<Home />} />
//       </Route>
//     </>
//   )
// );

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
      // {
      //   path: "/home",
      //   element: <Home />,
      // },
      {
        path: "*",
        element: <Signin />,
      },
    ],
  },
  {
    // path: "/contact",
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
