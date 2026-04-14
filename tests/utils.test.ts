import { describe, it, expect } from 'vitest';
import { getDayData, getDatesWithMenus, getNextMeal } from '../lib/menus';
import {
  getMonthExpenses,
  getTotalSpent,
  getBudgetPercent,
  DEFAULT_BUDGET,
} from '../lib/store';

describe('menus.ts', () => {
  it('getDayData returns null for unknown date', () => {
    expect(getDayData('2026-01-01')).toBeNull();
  });

  it('getDayData returns data for known date', () => {
    const data = getDayData('2026-04-01');
    expect(data).not.toBeNull();
    expect(data?.meals.length).toBeGreaterThan(0);
  });

  it('getDatesWithMenus returns correct dates for April 2026', () => {
    const dates = getDatesWithMenus(2026, 4);
    expect(dates.has('2026-04-01')).toBe(true);
    expect(dates.has('2026-04-14')).toBe(true);
    expect(dates.has('2026-04-99')).toBe(false);
  });

  it('getDayData birthday day has correct mode', () => {
    const data = getDayData('2026-04-14');
    expect(data?.mode).toBe('birthday');
    expect(data?.isBirthday).toBe(true);
  });

  it('getDayData batch day has correct mode', () => {
    const data = getDayData('2026-04-02');
    expect(data?.mode).toBe('batch');
  });

  it('getDayData livraison day has correct mode', () => {
    const data = getDayData('2026-04-03');
    expect(data?.mode).toBe('livraison');
  });

  it('meals have valid types', () => {
    const data = getDayData('2026-04-01');
    const validTypes = ['matin', 'midi', 'gouter', 'diner', 'snack'];
    data?.meals.forEach(meal => {
      expect(validTypes).toContain(meal.type);
    });
  });
});

describe('store.ts — budget utilities', () => {
  it('getMonthExpenses filters by month', () => {
    const expenses = DEFAULT_BUDGET.expenses;
    const aprilExpenses = getMonthExpenses(expenses, 2026, 4);
    expect(aprilExpenses.length).toBeGreaterThan(0);
    aprilExpenses.forEach(e => {
      expect(e.date.startsWith('2026-04')).toBe(true);
    });
  });

  it('getTotalSpent sums amounts correctly', () => {
    const expenses = [
      { id: '1', date: '2026-04-01', amount: 10.50, category: 'courses' as const, label: 'Test' },
      { id: '2', date: '2026-04-02', amount: 20.00, category: 'livraison' as const, label: 'Test2' },
    ];
    expect(getTotalSpent(expenses)).toBeCloseTo(30.50);
  });

  it('getTotalSpent returns 0 for empty array', () => {
    expect(getTotalSpent([])).toBe(0);
  });

  it('getBudgetPercent calculates correctly', () => {
    expect(getBudgetPercent(175, 350)).toBe(50);
    expect(getBudgetPercent(350, 350)).toBe(100);
    expect(getBudgetPercent(0, 350)).toBe(0);
  });

  it('getBudgetPercent caps at 100', () => {
    expect(getBudgetPercent(500, 350)).toBe(100);
  });

  it('DEFAULT_BUDGET has valid structure', () => {
    expect(DEFAULT_BUDGET.monthlyBudget).toBeGreaterThan(0);
    expect(Array.isArray(DEFAULT_BUDGET.expenses)).toBe(true);
  });
});
