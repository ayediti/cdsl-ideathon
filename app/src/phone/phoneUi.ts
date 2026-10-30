import { create } from 'zustand';
import type { AppId } from '../engine/types';

interface PhoneUi {
  open: boolean;
  app: AppId | null;
  /** Opens the phone, optionally straight into an app. */
  openTo: (app: AppId | null) => void;
  close: () => void;
}

export const usePhoneUi = create<PhoneUi>((set) => ({
  open: false,
  app: null,
  openTo: (app) => set({ open: true, app }),
  close: () => set({ open: false, app: null }),
}));
