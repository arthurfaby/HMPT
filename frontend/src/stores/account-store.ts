import User from "@/types/user";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useAccountStore = create(
  persist(
    combine(
      {
        account: null as undefined | null | User,
      },
      (set) => ({
        setAccount: (account: User | null) => set({ account }),
      }),
    ),
    { name: "account" },
  ),
);
