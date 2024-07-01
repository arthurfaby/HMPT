import { useAccountStore } from "@/stores/account-store";
import { useCallback } from "react";
import { getUser, postLogin } from "@/services/api/authApi";
import { toast } from "sonner";
import postRegister from "@/services/api/registerApi";
import { kyPOST } from "@/utils/ky/handlers";
import { HTTPError } from "ky";

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
      try {

      await postRegister(username, email, password, firstName, lastName).then((data) => {
        if ('error' in data) {
          toast.error(data.error);
          setAccount(null);
        } else {
          setAccount(data.message)
        }
      });
    } catch(error) {
      if (error instanceof HTTPError) {
        console.log(error.request)
      }
      console.log(error)
      toast.error("Une erreur est survenue lors de l'inscription.")
      setAccount(null);
    }
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
