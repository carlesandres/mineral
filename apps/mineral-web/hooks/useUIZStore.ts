import React, { ReactNode } from 'react';
import { create } from 'zustand';

export interface Notif {
  children: ReactNode;
  id: string;
}

interface StoreState {
  mdCheatVisible: boolean;
  showMdCheat: () => void;
  hideMdCheat: () => void;
  backupModalVisible: boolean;
  showBackupModal: () => void;
  hideBackupModal: () => void;
  fileImportModalVisible: boolean;
  showFileImport: () => void;
  hideFileImport: () => void;
  mainMenuCollapsed: boolean;
  setMainMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  cmdPaletteVisible: boolean;
  setCmdPaletteVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUIZStore = create<StoreState>((set) => ({
  mdCheatVisible: false,
  showMdCheat: () => set(() => ({ mdCheatVisible: true })),
  hideMdCheat: () => set(() => ({ mdCheatVisible: false })),
  backupModalVisible: false,
  showBackupModal: () => set(() => ({ backupModalVisible: true })),
  hideBackupModal: () => set(() => ({ backupModalVisible: false })),
  fileImportModalVisible: false,
  showFileImport: () => set(() => ({ fileImportModalVisible: true })),
  hideFileImport: () => set(() => ({ fileImportModalVisible: false })),
  mainMenuCollapsed: true,
  setMainMenuCollapsed: (collapsed: boolean) =>
    set(() => ({ mainMenuCollapsed: collapsed })),
  cmdPaletteVisible: false,
  setCmdPaletteVisible: (visible: boolean) =>
    set(() => ({ cmdPaletteVisible: visible })),
}));

export default useUIZStore;
