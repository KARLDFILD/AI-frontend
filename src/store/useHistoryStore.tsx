import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CharacterHistory {
  id: number;
  name: string;
  avatar?: string;
}

interface HistoryStore {
  history: CharacterHistory[];
  addToHistory: (character: CharacterHistory) => void;
}

const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (character) =>
        set((state) => {
          const filteredHistory = state.history.filter(
            (item) => item.id !== character.id
          );
          const newHistory = [character, ...filteredHistory].slice(0, 5);
          return { history: newHistory };
        }),
    }),
    {
      name: "character-history",
    }
  )
);

export default useHistoryStore;
