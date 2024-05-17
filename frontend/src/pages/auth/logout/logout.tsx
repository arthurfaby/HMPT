import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { postLogout } from "@/services/api/authApi";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    postLogout()
      .then(() => {
        logout();
      })
      .catch(() => {
        toast.error("Vous n'êtes pas connecté.");
        logout();
      });
  }, []);

  return <Navigate to="/login" />;
}
