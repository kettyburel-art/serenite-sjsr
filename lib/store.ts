import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSettings, BudgetState, Expense, ImpulseEntry } from './types';

// ─── Clés de stockage ────────────────────────────────────────────────────────

const KEYS = {
  SETTINGS: 'serenite:settings',
  BUDGET: 'serenite:budget',
  IMPULSES: 'serenite:impulses',
} as const;

// ─── Valeurs par défaut ───────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: AppSettings = {
  monthlyBudget: 350,
  colorScheme: 'auto',
  remindersEnabled: false,
  reminderTimes: {
    matin: '07:30',
    midi: '12:30',
    gouter: '16:00',
    diner: '19:30',
  },
};

export const DEFAULT_BUDGET: BudgetState = {
  monthlyBudget: 350,
  expenses: [
    {
      id: '1',
      date: '2026-04-01',
      amount: 45.80,
      category: 'courses',
      label: 'Marché du mercredi',
    },
    {
      id: '2',
      date: '2026-04-03',
      amount: 32.50,
      category: 'livraison',
      label: 'Panier bio hebdomadaire',
    },
    {
      id: '3',
      date: '2026-04-07',
      amount: 18.90,
      category: 'courses',
      label: 'Supermarché — compléments',
    },
    {
      id: '4',
      date: '2026-04-10',
      amount: 24.00,
      category: 'restaurant',
      label: 'Déjeuner avec collègues',
    },
  ],
};

// ─── Paramètres ──────────────────────────────────────────────────────────────

export async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

// ─── Budget ──────────────────────────────────────────────────────────────────

export async function loadBudget(): Promise<BudgetState> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.BUDGET);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_BUDGET;
}

export async function saveBudget(budget: BudgetState): Promise<void> {
  await AsyncStorage.setItem(KEYS.BUDGET, JSON.stringify(budget));
}

export async function addExpense(expense: Omit<Expense, 'id'>): Promise<void> {
  const budget = await loadBudget();
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
  };
  budget.expenses.push(newExpense);
  await saveBudget(budget);
}

export async function deleteExpense(id: string): Promise<void> {
  const budget = await loadBudget();
  budget.expenses = budget.expenses.filter(e => e.id !== id);
  await saveBudget(budget);
}

// ─── Journal d'impulsions TDAH ───────────────────────────────────────────────

export async function loadImpulses(): Promise<ImpulseEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.IMPULSES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export async function addImpulse(entry: Omit<ImpulseEntry, 'id' | 'date' | 'resolved'>): Promise<void> {
  const impulses = await loadImpulses();
  const newEntry: ImpulseEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    resolved: false,
  };
  impulses.unshift(newEntry);
  await AsyncStorage.setItem(KEYS.IMPULSES, JSON.stringify(impulses));
}

export async function resolveImpulse(id: string): Promise<void> {
  const impulses = await loadImpulses();
  const idx = impulses.findIndex(i => i.id === id);
  if (idx !== -1) {
    impulses[idx].resolved = true;
    await AsyncStorage.setItem(KEYS.IMPULSES, JSON.stringify(impulses));
  }
}

export async function deleteImpulse(id: string): Promise<void> {
  const impulses = await loadImpulses();
  const filtered = impulses.filter(i => i.id !== id);
  await AsyncStorage.setItem(KEYS.IMPULSES, JSON.stringify(filtered));
}

// ─── Utilitaires budget ───────────────────────────────────────────────────────

export function getMonthExpenses(expenses: Expense[], year: number, month: number): Expense[] {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  return expenses.filter(e => e.date.startsWith(prefix));
}

export function getTotalSpent(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getBudgetPercent(spent: number, budget: number): number {
  return Math.min(100, Math.round((spent / budget) * 100));
}
