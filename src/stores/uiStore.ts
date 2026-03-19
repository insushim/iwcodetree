import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { generateId } from "@/lib/utils/helpers";

export type Theme = "light" | "dark";

export interface ModalEntry {
  id: string;
  component: string; // modal component key
  props?: Record<string, unknown>;
}

export interface Toast {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number; // ms, default 3000
}

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  modalStack: ModalEntry[];
  toasts: Toast[];

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  showModal: (component: string, props?: Record<string, unknown>) => string;
  hideModal: (id?: string) => void;
  addToast: (
    message: string,
    type?: Toast["type"],
    duration?: number,
  ) => string;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      theme: "light",
      sidebarOpen: true,
      modalStack: [],
      toasts: [],

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      showModal: (component, props) => {
        const id = generateId("modal");
        set({ modalStack: [...get().modalStack, { id, component, props }] });
        return id;
      },

      hideModal: (id) => {
        if (id) {
          set({
            modalStack: get().modalStack.filter((m) => m.id !== id),
          });
        } else {
          // Pop the top modal
          set({ modalStack: get().modalStack.slice(0, -1) });
        }
      },

      addToast: (message, type = "info", duration = 3000) => {
        const id = generateId("toast");
        const toast: Toast = { id, message, type, duration };
        set({ toasts: [...get().toasts, toast] });
        if (duration > 0) {
          setTimeout(() => get().removeToast(id), duration);
        }
        return id;
      },

      removeToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    { name: "uiStore" },
  ),
);
