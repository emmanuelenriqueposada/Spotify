import { useItemContext } from "../../context/useItemContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../common/Loading";

export const ProtectedRoute = () => {
  const { isUserLoggedIn, loading } = useItemContext();

  if (loading) {
    return <Loading />;
  }

  if (isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
