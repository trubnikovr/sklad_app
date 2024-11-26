// useExceptionStore.ts
import { create } from 'zustand';

interface ExceptionState {
  error: string | null;
  showError: (error: string) => void;
  hideError: () => void;
}

export const useExceptionStore = create<ExceptionState>((set) => ({
  error: null,
  showError: (error) => set(() => ({ error })),
  hideError: () => set(() => ({ error: null })),
}));
