import create from 'zustand';

// @ts-ignore
const useAppStore = create((set) => ({
  // Global state variables
  ajaxPreloader: false,

  // Actions to toggle showAjax
  showAjaxPreloader: () => set({ showPreloader: true }),
  hideAjaxPreloader: () => set({ showPreloader: false }),
}));

export default useAppStore;
