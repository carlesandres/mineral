import { produce } from 'immer';
import { create } from 'zustand';

interface StoreState {
  ui: {
    isGlobalModalOpen: boolean;
  };
}

const useZStore = create<StoreState>(() => ({
  ui: {
    isGlobalModalOpen: false,
  },
}));

export const setGlobalModalOpen = (isGlobalModalOpen: boolean) =>
  useZStore.setState((state) => {
    const newState = produce(state, (draftState) => {
      draftState.ui.isGlobalModalOpen = isGlobalModalOpen;
    });
    return newState;
  });
