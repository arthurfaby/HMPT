import { useAuth } from "@/hooks/useAuth";
import { kyPOST } from "@/utils/ky/handlers";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function Verify() {
  // Get the token from the URL
  const { token } = useParams();
  const { logout } = useAuth();

  useEffect(() => {
    const verifyAccount = async () => {
      const data = await kyPOST("verify/" + token, {}, logout);
      if (data && typeof data === "object" && "message" in data) {
        toast.success(
          "Votre compte a bien été vérifié. Vous pouvez maintenant vous connecter.",
        );
      } else {
        toast.error("Erreur lors de la vérification du compte.");
      }
    };

    verifyAccount();
  });

  return <Navigate to={"/"} />;
}
