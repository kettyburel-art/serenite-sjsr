import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import {
  loadBudget,
  saveBudget,
  addExpense,
  deleteExpense,
  getMonthExpenses,
  getTotalSpent,
  getBudgetPercent,
} from '@/lib/store';
import type { Expense, ExpenseCategory } from '@/lib/types';

const CATEGORY_CONFIG: Record<ExpenseCategory, { label: string; icon: string; color: string }> = {
  courses:   { label: 'Courses',    icon: '🛒', color: '#5a8a5a' },
  livraison: { label: 'Livraison',  icon: '📦', color: '#9b7060' },
  restaurant:{ label: 'Restaurant', icon: '🍽️', color: '#e07840' },
  autre:     { label: 'Autre',      icon: '💳', color: '#7c5cbf' },
};

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState(350);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Formulaire
  const [newLabel, setNewLabel] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseCategory>('courses');

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const loadData = useCallback(async () => {
    const budget = await loadBudget();
    setMonthlyBudget(budget.monthlyBudget);
    const monthExpenses = getMonthExpenses(budget.expenses, currentYear, currentMonth);
    setExpenses(monthExpenses.sort((a, b) => b.date.localeCompare(a.date)));
  }, [currentYear, currentMonth]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalSpent = getTotalSpent(expenses);
  const remaining = monthlyBudget - totalSpent;
  const percent = getBudgetPercent(totalSpent, monthlyBudget);
  const isOverBudget = totalSpent > monthlyBudget;

  // Dépenses par catégorie
  const byCategory = Object.keys(CATEGORY_CONFIG).reduce((acc, cat) => {
    const catExpenses = expenses.filter(e => e.category === cat);
    acc[cat as ExpenseCategory] = getTotalSpent(catExpenses);
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const handleAdd = async () => {
    if (!newLabel.trim() || !newAmount) return;
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await addExpense({
      label: newLabel.trim(),
      amount: parseFloat(newAmount),
      category: newCategory,
      date: today.toISOString().split('T')[0],
    });
    setNewLabel('');
    setNewAmount('');
    setNewCategory('courses');
    setAddModalVisible(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteExpense(id);
    await loadData();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.flowerDeco}>💶</Text>
        <Text style={styles.headerTitle}>Budget Alimentation</Text>
        <Text style={styles.headerSub}>{MONTH_NAMES[currentMonth - 1].toUpperCase()} {currentYear}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Carte budget principal */}
        <View style={[styles.budgetCard, isOverBudget && styles.budgetCardOver]}>
          <View style={styles.budgetCardTop}>
            <View>
              <Text style={styles.budgetCardLabel}>Restant</Text>
              <Text style={[styles.budgetCardAmount, isOverBudget && styles.budgetCardAmountOver]}>
                {remaining.toFixed(2)}€
              </Text>
            </View>
            <View style={styles.budgetCardRight}>
              <Text style={styles.budgetCardLabel}>Dépensé</Text>
              <Text style={styles.budgetCardSpent}>{totalSpent.toFixed(2)}€</Text>
              <Text style={styles.budgetCardTotal}>/ {monthlyBudget}€</Text>
            </View>
          </View>

          {/* Barre de progression */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${percent}%` as any },
                isOverBudget && styles.progressFillOver,
              ]}
            />
          </View>
          <Text style={styles.progressLabel}>
            {percent}% utilisé{isOverBudget ? ' — Budget dépassé !' : ''}
          </Text>
        </View>

        {/* Répartition par catégorie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Répartition</Text>
          <View style={styles.categoriesGrid}>
            {(Object.entries(CATEGORY_CONFIG) as [ExpenseCategory, typeof CATEGORY_CONFIG[ExpenseCategory]][]).map(([cat, config]) => (
              <View key={cat} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{config.icon}</Text>
                <Text style={styles.categoryLabel}>{config.label}</Text>
                <Text style={[styles.categoryAmount, { color: config.color }]}>
                  {byCategory[cat].toFixed(2)}€
                </Text>
                {monthlyBudget > 0 && (
                  <View style={styles.categoryBar}>
                    <View
                      style={[
                        styles.categoryBarFill,
                        {
                          width: `${Math.min(100, (byCategory[cat] / monthlyBudget) * 100)}%` as any,
                          backgroundColor: config.color,
                        },
                      ]}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Historique */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Historique du mois</Text>
            <Pressable
              onPress={() => setAddModalVisible(true)}
              style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.addBtnText}>+ Ajouter</Text>
            </Pressable>
          </View>

          {expenses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💳</Text>
              <Text style={styles.emptyText}>Aucune dépense ce mois-ci</Text>
            </View>
          ) : (
            <View style={styles.expensesList}>
              {expenses.map(expense => {
                const config = CATEGORY_CONFIG[expense.category];
                return (
                  <View key={expense.id} style={styles.expenseItem}>
                    <View style={[styles.expenseIconWrap, { backgroundColor: config.color + '20' }]}>
                      <Text style={styles.expenseIcon}>{config.icon}</Text>
                    </View>
                    <View style={styles.expenseInfo}>
                      <Text style={styles.expenseLabel}>{expense.label}</Text>
                      <Text style={styles.expenseDate}>
                        {new Date(expense.date + 'T12:00:00').toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                        {' · '}{config.label}
                      </Text>
                    </View>
                    <View style={styles.expenseRight}>
                      <Text style={styles.expenseAmount}>-{expense.amount.toFixed(2)}€</Text>
                      <Pressable
                        onPress={() => handleDelete(expense.id)}
                        style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.6 }]}
                      >
                        <Text style={styles.deleteBtnText}>✕</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Conseils budget */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Conseils budget anti-TDAH</Text>
          <Text style={styles.tip}>• Faire les courses avec une liste préparée à l'avance</Text>
          <Text style={styles.tip}>• Éviter le supermarché quand on est fatigué·e ou stressé·e</Text>
          <Text style={styles.tip}>• Batch cooking = moins de livraisons impulsives</Text>
          <Text style={styles.tip}>• Régler les achats en espèces pour mieux visualiser les dépenses</Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Modal ajout dépense */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setAddModalVisible(false)} />
          <View style={styles.modalPanel}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Ajouter une dépense</Text>

            <TextInput
              style={styles.input}
              placeholder="Description (ex: Marché bio)"
              placeholderTextColor="#9b7060"
              value={newLabel}
              onChangeText={setNewLabel}
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Montant (€)"
              placeholderTextColor="#9b7060"
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
              returnKeyType="done"
            />

            <Text style={styles.categoryPickerLabel}>Catégorie</Text>
            <View style={styles.categoryPicker}>
              {(Object.entries(CATEGORY_CONFIG) as [ExpenseCategory, typeof CATEGORY_CONFIG[ExpenseCategory]][]).map(([cat, config]) => (
                <Pressable
                  key={cat}
                  onPress={() => setNewCategory(cat)}
                  style={[
                    styles.categoryPickerItem,
                    newCategory === cat && styles.categoryPickerItemActive,
                  ]}
                >
                  <Text style={styles.categoryPickerIcon}>{config.icon}</Text>
                  <Text style={[
                    styles.categoryPickerText,
                    newCategory === cat && styles.categoryPickerTextActive,
                  ]}>
                    {config.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              onPress={handleAdd}
              style={({ pressed }) => [styles.confirmBtn, pressed && { opacity: 0.7 }]}
            >
              <Text style={styles.confirmBtnText}>Ajouter la dépense</Text>
            </Pressable>

            <View style={{ height: 16 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf6f3' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },

  header: {
    backgroundColor: '#3a2030',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    overflow: 'hidden',
  },
  flowerDeco: {
    position: 'absolute',
    right: 16,
    top: 8,
    fontSize: 48,
    opacity: 0.15,
  },
  headerTitle: {
    fontSize: 22,
    color: '#f2c4ce',
    fontStyle: 'italic',
    fontWeight: '400',
    marginBottom: 2,
  },
  headerSub: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  budgetCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ede0d8',
    shadowColor: '#3a2820',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  budgetCardOver: {
    borderColor: '#e8899a',
    backgroundColor: '#fff8f9',
  },
  budgetCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  budgetCardLabel: {
    fontSize: 10,
    color: '#9b7060',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  budgetCardAmount: {
    fontSize: 36,
    fontWeight: '300',
    color: '#5a8a5a',
  },
  budgetCardAmountOver: { color: '#c45c78' },
  budgetCardRight: { alignItems: 'flex-end' },
  budgetCardSpent: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3a2820',
  },
  budgetCardTotal: {
    fontSize: 12,
    color: '#9b7060',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#f0e8e4',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#5a8a5a',
  },
  progressFillOver: { backgroundColor: '#c45c78' },
  progressLabel: {
    fontSize: 11,
    color: '#9b7060',
    textAlign: 'right',
  },

  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3a2820',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#c45c78',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },

  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  categoryIcon: { fontSize: 20, marginBottom: 4 },
  categoryLabel: { fontSize: 11, color: '#9b7060', fontWeight: '600' },
  categoryAmount: { fontSize: 18, fontWeight: '700', marginTop: 2 },
  categoryBar: {
    height: 3,
    backgroundColor: '#f0e8e4',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 2,
  },

  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  emptyIcon: { fontSize: 32, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#9b7060' },

  expensesList: { gap: 8 },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ede0d8',
    gap: 10,
  },
  expenseIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseIcon: { fontSize: 18 },
  expenseInfo: { flex: 1 },
  expenseLabel: { fontSize: 13, fontWeight: '600', color: '#3a2820' },
  expenseDate: { fontSize: 11, color: '#9b7060', marginTop: 2 },
  expenseRight: { alignItems: 'flex-end', gap: 4 },
  expenseAmount: { fontSize: 14, fontWeight: '700', color: '#c45c78' },
  deleteBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fdf0f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: { fontSize: 10, color: '#c45c78', fontWeight: '700' },

  tipsCard: {
    marginHorizontal: 16,
    backgroundColor: '#ede8f8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(124,92,191,0.15)',
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7c5cbf',
    marginBottom: 10,
  },
  tip: {
    fontSize: 12,
    color: '#3a2820',
    lineHeight: 20,
  },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(58,32,48,0.45)',
  },
  modalPanel: {
    backgroundColor: '#faf6f3',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 8,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(58,40,32,0.12)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#3a2820',
    borderWidth: 1,
    borderColor: '#ede0d8',
    marginBottom: 10,
  },
  categoryPickerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9b7060',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  categoryPicker: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryPickerItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ede0d8',
  },
  categoryPickerItemActive: {
    borderColor: '#c45c78',
    backgroundColor: '#fdf0f4',
  },
  categoryPickerIcon: { fontSize: 18, marginBottom: 3 },
  categoryPickerText: { fontSize: 10, color: '#9b7060', fontWeight: '600' },
  categoryPickerTextActive: { color: '#c45c78' },
  confirmBtn: {
    backgroundColor: '#c45c78',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});
