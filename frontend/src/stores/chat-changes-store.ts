import { create } from "zustand";

interface ChatChangesStore {
  changes: number;
  makeChanges: () => void;
}

const useChatChangesStore = create<ChatChangesStore>()((set) => ({
  changes: 0,
  makeChanges: () => set((state) => ({ changes: state.changes + 1 })),
}));

export { useChatChangesStore };
