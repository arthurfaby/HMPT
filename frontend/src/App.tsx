import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/register/register";
import "./App.css";
import Home from "./pages/home/home";
import GlobalLayout from "./layouts/global/global-layout";
import AuthGuard from "./pages/auth/authGuard";
import Login from "./pages/auth/login/login";
import Profile from "./pages/profile/profile";
import { ThemeProvider } from "@/services/theme/theme";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
        children: [
          {
            path: "home",
            element: <Home/>,
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
    <ThemeProvider defaultTheme="dark" storageKey="matcha-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
