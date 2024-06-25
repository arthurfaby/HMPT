import { useAccountStore } from "@/stores/account-store";
import { useCallback } from "react";
import { getUser, postLogin } from "@/services/api/authApi";
import { toast } from "sonner";
import postRegister from "@/services/api/registerApi";
import { kyPOST } from "@/utils/ky/handlers";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  const { account, setAccount } = useAccountStore();
  let status: AuthStatus;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const Authenticate = useCallback(async () => {
    await getUser()
      .then(setAccount)
      .catch(() => setAccount(null));
  }, []);

  const logout = useCallback(async () => {
    setAccount(null);
    await kyPOST<{}, { online: boolean }>(
      "users/online",
      { online: false },
      () => setAccount(null),
    );
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<Boolean> => {
      try {
        const response = await postLogin({ username, password });
        if (response) {
          toast.success("Vous êtes bien connecté.");
          setAccount(response);
          await kyPOST<{}, { online: boolean }>(
            "users/online",
            { online: true },
            () => setAccount(null),
          );
          return true;
        }
      } catch (error) {
        toast.error("identifiants ou mot de passe incorrects.");
        setAccount(null);
        return false;
      }
      return false;
    },
    [],
  );

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      firstName: string,
      lastName: string,
    ) => {
      await postRegister(username, email, password, firstName, lastName).then(
        setAccount,
      );
    },
    [],
  );

  return {
    account,
    status,
    Authenticate,
    login,
    logout,
    register,
  };
}
