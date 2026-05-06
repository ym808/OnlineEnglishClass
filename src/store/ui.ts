import { create } from 'zustand'

interface Toast {
  id: string
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
  duration: number
}

interface UIState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  modalOpen: string | null
  setModal: (id: string | null) => void
}

export const useUI = create<UIState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  modalOpen: null,
  setModal: (id) => set({ modalOpen: id }),
}))
