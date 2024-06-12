import { State, create } from "zustand";

interface MatchStore {
  matches: number;
  addMatch: () => void;
}

const useMatchStore = create<MatchStore>()((set) => ({
  matches: 0,
  addMatch: () => set((state) => ({ matches: state.matches + 1 })),
}));

export { useMatchStore };
