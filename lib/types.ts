// ─── Types de base ───────────────────────────────────────────────────────────

export type NutriTag =
  | 'fer'
  | 'mag'
  | 'alk'
  | 'vitc'
  | 'fun'
  | 'bday'
  | 'dopa'
  | 'tdah'
  | 'omega3'
  | 'zinc'
  | 'b12';

export type MealType = 'matin' | 'midi' | 'gouter' | 'diner' | 'snack';

export type DayMode = 'livraison' | 'batch' | 'birthday' | 'normal';

export interface Ingredient {
  name: string;
  isFresh?: boolean;
  isBirthday?: boolean;
}

export interface Meal {
  type: MealType;
  title: string;
  ingredients: Ingredient[];
  nutriTags: NutriTag[];
  conseil?: string;
  tdahPause?: string;
  time?: string;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  mode: DayMode;
  meals: Meal[];
  sjsrAlert?: string;
  specialNote?: string;
  isBirthday?: boolean;
  birthdayPerson?: string;
}

// ─── Budget ──────────────────────────────────────────────────────────────────

export type ExpenseCategory = 'courses' | 'livraison' | 'restaurant' | 'autre';

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  label: string;
}

export interface BudgetState {
  monthlyBudget: number;
  expenses: Expense[];
}

// ─── Outils TDAH ─────────────────────────────────────────────────────────────

export interface ImpulseEntry {
  id: string;
  date: string;
  description: string;
  amount?: number;
  resolved: boolean;
}

// ─── Paramètres ──────────────────────────────────────────────────────────────

export interface AppSettings {
  monthlyBudget: number;
  colorScheme: 'light' | 'dark' | 'auto';
  remindersEnabled: boolean;
  reminderTimes: {
    matin: string;
    midi: string;
    gouter: string;
    diner: string;
  };
}
