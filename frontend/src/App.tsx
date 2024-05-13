import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/register/register";
import "./App.css";
import Home from "./pages/home/Home";
import GlobalLayout from "./layouts/global/GlobalLayout";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
