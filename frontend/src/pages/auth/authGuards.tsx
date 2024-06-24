import { PropsWithChildren, useEffect } from "react";
import { AuthStatus, useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { kyGET } from "@/utils/ky/handlers";
import { useAccountStore } from "@/stores/account-store";
import User from "@/types/user";
import Profile from "../profile/profile";

function isCompleted(user: User): boolean {
  console.log(user) 
  if (!user ||
      !user['gender'] ||
      !user['biography'] ||
      !user['interests'] ||
      !user['profil_picture'] ||
      !user['pictures'] ||
      user['age'] === 0
    ) 
    return false
  
  return true
}


export function AuthGuard(props: PropsWithChildren) {
  const { status, Authenticate } = useAuth();
  const { account } = useAccountStore()

  if (status === AuthStatus.Unknown) {
    Authenticate();
  }
  
  if (status === AuthStatus.Guest) {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  
  if (account && isCompleted(account)) {
    return <Outlet />;
  }
  else
    return <Profile/>
}

export function UnAuthGuard(props: PropsWithChildren) {
  const { status } = useAuth();

  if (status === AuthStatus.Authenticated) {
    return <Navigate to="/matches" replace={true}></Navigate>;
  }
  return <Outlet />;
}
