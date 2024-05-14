import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/register/register";
import "./App.css";
import Home from "./pages/home/Home";
import GlobalLayout from "./layouts/global/GlobalLayout";
import AuthGuard from "./pages/auth/authGuard";
import Login from "./pages/auth/login/login";
import Profile from "./pages/profile/profile";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <AuthGuard/>,
        children: [
          {
            path: "home",
            element: <Home/>
          }
        ]
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
