import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { LoginComponent } from "../components/auth/Login";
import { RegisterComponent } from "../components/auth/Register";
import MainPage from "../pages/home/MainPage";
import NotFound from "../pages/error/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
        errorElement: <NotFound />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/login",
            element: <LoginComponent />,
          },
          {
            path: "/register",
            element: <RegisterComponent />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
