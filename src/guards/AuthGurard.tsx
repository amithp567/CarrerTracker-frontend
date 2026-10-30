import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const name = localStorage.getItem("name");

  if (!access || !refresh || !name) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;