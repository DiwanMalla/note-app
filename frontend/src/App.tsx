import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import RouteLayout from "./Route/RouteLayout";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
