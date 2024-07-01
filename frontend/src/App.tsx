import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
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
import { useEffect, useState } from "react";
import { kyGET, kyPOST } from "./utils/ky/handlers";
import { AuthStatus, useAuth } from "./hooks/useAuth";
import { Location } from "./types/geolocation_type";
import { History } from "./pages/history/history";

type IPGeolocationApiResponse = {
  IPv4: string;
  city: string;
  country_code: string;
  country_name: string;
  latitude: number;
  longitude: number;
  postal: string;
  state: string;
};

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
            path: "/history",
            element: <History />,
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
  const [initStatus, setInitStatus] = useState(false);
  const [initGeolocation, setInitGeolocation] = useState(false);
  const { status, logout } = useAuth();

  useEffect(() => {
    if (status !== AuthStatus.Authenticated) return;

    const listenGeolocationChange = async () => {
      const accessResult = await navigator.permissions.query({
        name: "geolocation",
      });
      accessResult.onchange = getAndPutGeolocation;
    };

    const getAndPutGeolocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          await kyPOST<{ geolocation: Location }, Location>(
            "users/geolocation",
            { latitude, longitude },
            logout,
          );
        },
        async () => {
          const response = await fetch("https://geolocation-db.com/json/");
          const geolocation =
            (await response.json()) as IPGeolocationApiResponse;
          const { latitude, longitude } = geolocation;
          await kyPOST<{ geolocation: Location }, Location>(
            "users/geolocation",
            { latitude, longitude },
            logout,
          );
        },
      );
    };

    const updateOnlineStatus = async (status: boolean) => {
      await kyPOST<{}, { online: boolean }>(
        "users/online",
        { online: status },
        logout,
      );
    };

    if (!initGeolocation) {
      listenGeolocationChange();
      getAndPutGeolocation();
      setInitGeolocation(true);
    }

    if (!initStatus) {
      updateOnlineStatus(true);
      window.addEventListener("beforeunload", (e) => {
        updateOnlineStatus(false);
      });
      setInitStatus(true);
    }
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="matcha-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
