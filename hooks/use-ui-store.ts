import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (value: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (value: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (value: boolean) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
      mobileNavOpen: false,
      setMobileNavOpen: (value) => set({ mobileNavOpen: value }),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (value) => set({ commandPaletteOpen: value }),
    }),
    { name: "abm-ui-store", partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) }
  )
);
