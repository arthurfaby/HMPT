import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/register/register";
import "./App.css";
import Home from "./pages/home/home";
import GlobalLayout from "./layouts/global/global-layout";
import { ThemeProvider } from "@/services/theme/theme";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
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
