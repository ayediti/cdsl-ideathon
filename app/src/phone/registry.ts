// A simulated slice of SEBI's public list of registered intermediaries. Every entity here is fictional;
// players are pointed to the real lookup on sebi.gov.in.

export interface RegistryEntry {
  id: string;
  name: string;
  category: string;
  regNo: string;
  status: 'active' | 'cancelled';
}

export const REGISTRY: RegistryEntry[] = [
  {
    id: 'banyan',
    name: 'Banyan Securities Ltd',
    category: 'Stock broker · Depository Participant',
    regNo: 'INZ000•••081',
    status: 'active',
  },
  {
    id: 'mehta',
    name: 'Mehta Wealth Advisory',
    category: 'Investment Adviser',
    regNo: 'INA000•••227',
    status: 'active',
  },
  {
    id: 'dhanlaxmi',
    name: 'Dhanlaxmi Capital Services',
    category: 'Stock broker',
    regNo: 'INZ000•••145',
    status: 'cancelled',
  },
];

export const REGISTRY_SUGGESTIONS = ['Banyan Securities', 'StockGuru Pro', 'Dhanlaxmi Capital'];

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export function lookup(query: string): RegistryEntry | null {
  const q = normalise(query);
  if (q.length < 3) return null;
  return REGISTRY.find((e) => normalise(e.name).includes(q)) ?? null;
}

/** Flag key recording that a query was looked up, so phone tasks can wait for it. */
export const lookupFlag = (query: string) => `verify:${normalise(query)}`;
