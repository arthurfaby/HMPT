import { useAccountStore } from "@/stores/account-store";
import { useCallback } from "react";
import { getUser, postLogin } from "@/services/api/authApi";
import { toast } from "sonner";

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

  const login = useCallback(async (username: string, password: string) => {
    await postLogin({ username, password }).then(setAccount);
  }, []);

  return {
    account,
    status,
    Authenticate,
    login,
    logout,
  };
}
