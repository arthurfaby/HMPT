import { useAuth } from "@/hooks/useAuth";
import { kyPOST } from "@/utils/ky/handlers";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

export function Verify() {
  // Get the token from the URL
  const { token } = useParams();
  const { logout } = useAuth();

  useEffect(() => {
    const verifyAccount = async () => {
      await kyPOST("verify/" + token, {}, logout);
      window.location.href = "/login";
    };

    verifyAccount();
  });

  return <Navigate to={"/login"} />;
}
