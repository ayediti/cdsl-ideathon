import { BANK_NAME } from '../brand';
import type { AppId } from '../engine/types';

export const APP_META: Record<AppId, { name: string; icon: string; color: string }> = {
  messages: { name: 'Messages', icon: '✉', color: '#2F6F8F' },
  bank: { name: BANK_NAME, icon: '₹', color: '#3D7A4E' },
  calculator: { name: 'Calculator', icon: '∑', color: '#8A6D2F' },
};
