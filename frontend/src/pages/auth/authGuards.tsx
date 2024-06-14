import { PropsWithChildren, useEffect } from "react";
import { AuthStatus, useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard(props: PropsWithChildren) {
  const { status, Authenticate } = useAuth();

  if (status === AuthStatus.Unknown) {
    Authenticate();
  }

  if (status === AuthStatus.Guest) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return <Outlet />;
}

export function UnAuthGuard(props: PropsWithChildren) {
  const { status } = useAuth();

  if (status === AuthStatus.Authenticated) {
    return <Navigate to="/matches" replace={true}></Navigate>;
  }
  return <Outlet />;
}
