import { Calculator, Landmark, MessageCircle, type LucideIcon } from 'lucide-react';
import { BANK_NAME } from '../brand';
import type { AppId } from '../engine/types';

export const APP_META: Record<AppId, { name: string; Icon: LucideIcon; color: string }> = {
  messages: { name: 'Messages', Icon: MessageCircle, color: 'linear-gradient(145deg, #3dd598, #11935e)' },
  bank: { name: BANK_NAME, Icon: Landmark, color: 'linear-gradient(145deg, #2a8f78, #0a4f41)' },
  calculator: { name: 'Calculator', Icon: Calculator, color: 'linear-gradient(145deg, #f7b955, #e07b1a)' },
};
