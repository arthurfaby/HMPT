import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { postLogout } from "@/services/api/authApi";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { kyPOST } from "@/utils/ky/handlers";

export function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    const logoutAndUpdateStatus = async () => {
      await kyPOST<{}, { online: boolean }>(
        "users/online",
        { online: false },
        logout,
      );
      postLogout()
        .then(() => {
          logout();
        })
        .catch(() => {
          toast.error("Vous n'êtes pas connecté.");
          logout();
        });
    };

    logoutAndUpdateStatus();
  }, []);

  return <Navigate to="/" />;
}
