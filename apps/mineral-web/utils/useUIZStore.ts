import React, { ReactNode } from 'react';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TIMEOUT_MS = 2000;

export interface Notif {
  children: ReactNode;
  id: string;
}

interface StoreState {
  mdCheatVisible: boolean;
  showMdCheat: () => void;
  hideMdCheat: () => void;
  notifications: Notif[];
  toast: (children: ReactNode) => void;
  backupModalVisible: boolean;
  showBackupModal: () => void;
  hideBackupModal: () => void;
  fileImportModalVisible: boolean;
  showFileImport: () => void;
  hideFileImport: () => void;
  mainMenuCollapsed: boolean;
  setMainMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUIZStore = create<StoreState>((set) => ({
  mdCheatVisible: false,
  showMdCheat: () => set(() => ({ mdCheatVisible: true })),
  hideMdCheat: () => set(() => ({ mdCheatVisible: false })),
  notifications: [],
  toast: (children: ReactNode) => {
    const id = uuidv4();
    set((state) => ({
      notifications: [...state.notifications, { children, id }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, DEFAULT_TIMEOUT_MS);
  },
  backupModalVisible: false,
  showBackupModal: () => set(() => ({ backupModalVisible: true })),
  hideBackupModal: () => set(() => ({ backupModalVisible: false })),
  fileImportModalVisible: false,
  showFileImport: () => set(() => ({ fileImportModalVisible: true })),
  hideFileImport: () => set(() => ({ fileImportModalVisible: false })),
  mainMenuCollapsed: true,
  setMainMenuCollapsed: (collapsed: boolean) =>
    set(() => ({ mainMenuCollapsed: collapsed })),
}));

export default useUIZStore;
