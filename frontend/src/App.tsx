import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import GlobalLayout from "./layouts/global/global-layout";
import { AuthGuard, UnAuthGuard } from "./pages/auth/authGuards";
import Profile from "./pages/profile/profile";
import { ThemeProvider } from "@/services/theme/theme";
import { Logout } from "@/pages/auth/logout/logout";
import { Matches } from "./pages/matches/matches";
import Chat from "./pages/chat/chat";
import ChangePassword from "./pages/auth/changePassword/changePassword";
import { useEffect } from "react";
import { kyPOST } from "./utils/ky/handlers";
import { useAuth } from "./hooks/useAuth";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/logout",
            element: <Logout />,
          },
          {
            path: "/matches",
            element: <Matches />,
          },
          {
            path: "/chat/:userId",
            element: <Chat />,
          },
          {
            path: "*",
            element: <Navigate to={"/matches"} />,
          },
        ],
      },
      {
        element: <UnAuthGuard />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/forget_password/:id",
            element: <ChangePassword />,
          },
          {
            path: "*",
            element: <Navigate to={"/"} />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { logout } = useAuth();

  useEffect(() => {
    const updateOnlineStatus = async (status: boolean) => {
      await kyPOST<{}, { online: boolean }>(
        "users/online",
        { online: status },
        logout,
      );
    };

    updateOnlineStatus(true);

    window.addEventListener("beforeunload", (e) => {
      updateOnlineStatus(false);
    });
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="matcha-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
