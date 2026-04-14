import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { ImpulseBar } from '@/components/ImpulseBar';
import { MealCard } from '@/components/MealCard';
import { getDayData, getDatesWithMenus, getNextMeal } from '@/lib/menus';
import { loadBudget, getMonthExpenses, getTotalSpent, addImpulse } from '@/lib/store';
import type { DayData } from '@/lib/types';

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // 0=Sun, 1=Mon... → convert to Mon-first (0=Mon, 6=Sun)
  const d = new Date(year, month - 1, 1).getDay();
  return (d + 6) % 7;
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarScreen() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [budgetTotal, setBudgetTotal] = useState(350);
  const [impulseModalVisible, setImpulseModalVisible] = useState(false);
  const [impulseInput, setImpulseInput] = useState('');

  // Dates avec menus
  const datesWithMenus = getDatesWithMenus(currentYear, currentMonth);

  // Charger le budget
  useEffect(() => {
    loadBudget().then(b => {
      const expenses = getMonthExpenses(b.expenses, currentYear, currentMonth);
      setBudgetSpent(getTotalSpent(expenses));
      setBudgetTotal(b.monthlyBudget);
    });
  }, [currentYear, currentMonth]);

  // Alerte SJSR du jour
  const todayStr = formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const todayData = getDayData(todayStr);

  // Navigation entre mois
  const prevMonth = useCallback(() => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentMonth === 1) {
      setCurrentYear(y => y - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(m => m - 1);
    }
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentMonth === 12) {
      setCurrentYear(y => y + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  }, [currentMonth]);

  // Ouvrir le détail d'un jour
  const openDay = useCallback((day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    const data = getDayData(dateStr);
    if (data) {
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedDay(data);
      setModalVisible(true);
    }
  }, [currentYear, currentMonth]);

  // Construire la grille du calendrier
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const day = i - firstDay + 1;
    cells.push(day >= 1 && day <= daysInMonth ? day : null);
  }

  // Boutons d'impulsion rapide
  const impulseActions = [
    {
      icon: '⏸️',
      label: 'Pause\n5 min',
      onPress: () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Naviguer vers l'onglet Outils
      },
    },
    {
      icon: '📝',
      label: 'Liste\nenvies',
      onPress: () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setImpulseModalVisible(true);
      },
    },
    {
      icon: '💶',
      label: 'Règle\n10€',
      onPress: () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      },
    },
    {
      icon: '🌬️',
      label: 'Respir-\nation',
      onPress: () => {
        if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      },
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <AppHeader
        budgetSpent={budgetSpent}
        budgetTotal={budgetTotal}
        sjsrAlert={todayData?.sjsrAlert}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barre d'impulsion rapide */}
        <View style={styles.section}>
          <ImpulseBar actions={impulseActions} />
        </View>

        {/* Navigation calendrier */}
        <View style={styles.section}>
          <View style={styles.calHeader}>
            <Pressable
              onPress={prevMonth}
              style={({ pressed }) => [styles.navBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.navBtnText}>‹</Text>
            </Pressable>
            <View style={styles.calTitleWrap}>
              <Text style={styles.calTitle}>
                {MONTH_NAMES[currentMonth - 1]} {currentYear}
              </Text>
              <View style={styles.budgetBadge}>
                <Text style={styles.budgetBadgeText}>
                  {(budgetTotal - budgetSpent).toFixed(0)}€ restants
                </Text>
              </View>
            </View>
            <Pressable
              onPress={nextMonth}
              style={({ pressed }) => [styles.navBtn, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.navBtnText}>›</Text>
            </Pressable>
          </View>

          {/* Jours de la semaine */}
          <View style={styles.weekdays}>
            {WEEKDAYS.map((wd, i) => (
              <Text key={i} style={styles.weekday}>{wd}</Text>
            ))}
          </View>

          {/* Grille des jours */}
          <View style={styles.calGrid}>
            {cells.map((day, i) => {
              if (!day) {
                return <View key={i} style={styles.emptyCell} />;
              }
              const dateStr = formatDate(currentYear, currentMonth, day);
              const dayData = getDayData(dateStr);
              const hasMenu = datesWithMenus.has(dateStr);
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() + 1 &&
                currentYear === today.getFullYear();

              const isBirthday = dayData?.mode === 'birthday';
              const isLivraison = dayData?.mode === 'livraison';
              const isBatch = dayData?.mode === 'batch';

              return (
                <Pressable
                  key={i}
                  onPress={() => openDay(day)}
                  style={({ pressed }) => [
                    styles.calDay,
                    hasMenu && styles.calDayHasMenu,
                    isLivraison && styles.calDayLivraison,
                    isBatch && styles.calDayBatch,
                    isBirthday && styles.calDayBirthday,
                    isToday && styles.calDayToday,
                    pressed && { transform: [{ scale: 0.9 }] },
                  ]}
                >
                  <Text style={[styles.calDayNum, isToday && styles.calDayNumToday]}>
                    {day}
                  </Text>
                  {isBirthday && <Text style={styles.calDayIcon}>🎂</Text>}
                  {isLivraison && !isBirthday && <Text style={styles.calDayIcon}>📦</Text>}
                  {isBatch && !isBirthday && !isLivraison && <Text style={styles.calDayIcon}>🍳</Text>}
                  {hasMenu && !isBirthday && !isLivraison && !isBatch && (
                    <View style={styles.calDot} />
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Légende */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#7aab72' }]} />
              <Text style={styles.legendText}>Menu planifié</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>📦</Text>
              <Text style={styles.legendText}>Livraison</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>🍳</Text>
              <Text style={styles.legendText}>Batch cooking</Text>
            </View>
            <View style={styles.legendItem}>
              <Text style={styles.legendIcon}>🎂</Text>
              <Text style={styles.legendText}>Anniversaire</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal détail du jour */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)} />
          <View style={styles.modalPanel}>
            <View style={styles.modalHandle} />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={({ pressed }) => [styles.modalClose, pressed && { opacity: 0.6 }]}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </Pressable>

            {selectedDay && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* En-tête du jour */}
                <View style={styles.panelHeader}>
                  <Text style={styles.panelDate}>
                    {new Date(selectedDay.date + 'T12:00:00').toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </Text>

                  {/* Mode badge */}
                  {selectedDay.mode === 'livraison' && (
                    <View style={[styles.modeBadge, { backgroundColor: '#f5ede8' }]}>
                      <Text style={[styles.modeBadgeText, { color: '#6b4c3b' }]}>
                        📦 Livraison
                      </Text>
                    </View>
                  )}
                  {selectedDay.mode === 'batch' && (
                    <View style={[styles.modeBadge, { backgroundColor: '#fdf8e8' }]}>
                      <Text style={[styles.modeBadgeText, { color: '#8a6800' }]}>
                        🍳 Batch cooking
                      </Text>
                    </View>
                  )}
                  {selectedDay.mode === 'birthday' && (
                    <View style={[styles.modeBadge, { backgroundColor: '#fdf0f4' }]}>
                      <Text style={[styles.modeBadgeText, { color: '#c45c78' }]}>
                        🎂 Anniversaire
                      </Text>
                    </View>
                  )}
                </View>

                {/* Note spéciale */}
                {selectedDay.specialNote && (
                  <View style={[
                    styles.specialBanner,
                    selectedDay.mode === 'birthday' && styles.bdayBanner,
                    selectedDay.mode === 'livraison' && styles.livraisonBanner,
                    selectedDay.mode === 'batch' && styles.batchBanner,
                  ]}>
                    <Text style={styles.specialBannerText}>{selectedDay.specialNote}</Text>
                  </View>
                )}

                {/* Prochain repas */}
                {(() => {
                  const next = getNextMeal(selectedDay);
                  if (!next) return null;
                  return (
                    <View style={styles.nextMealBar}>
                      <Text style={styles.nextMealIcon}>⏰</Text>
                      <View>
                        <Text style={styles.nextMealLabel}>Prochain repas</Text>
                        <Text style={styles.nextMealTitle}>
                          {next.meal.title}
                          <Text style={styles.nextMealTime}> · {next.label}</Text>
                        </Text>
                      </View>
                    </View>
                  );
                })()}

                {/* Repas */}
                <View style={styles.mealsContainer}>
                  {selectedDay.meals.map((meal, i) => (
                    <MealCard
                      key={i}
                      meal={meal}
                      isBirthday={selectedDay.mode === 'birthday'}
                    />
                  ))}
                </View>

                {/* Alerte SJSR */}
                {selectedDay.sjsrAlert && (
                  <View style={styles.sjsrAlert}>
                    <Text style={styles.sjsrAlertTitle}>🦵 Rappel SJSR</Text>
                    <Text style={styles.sjsrAlertText}>{selectedDay.sjsrAlert}</Text>
                  </View>
                )}

                <View style={{ height: 40 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf6f3',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  section: {
    marginHorizontal: 16,
    marginTop: 12,
  },

  // Calendrier
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  navBtnText: { fontSize: 20, color: '#3a2820', lineHeight: 24 },
  calTitleWrap: { alignItems: 'center' },
  calTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a2820',
  },
  budgetBadge: {
    marginTop: 2,
    backgroundColor: 'rgba(90,138,90,0.12)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(90,138,90,0.2)',
  },
  budgetBadgeText: { fontSize: 10, fontWeight: '700', color: '#5a8a5a' },
  weekdays: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    color: '#9b7060',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingVertical: 4,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  emptyCell: {
    width: `${100 / 7}%` as any,
    aspectRatio: 1,
  },
  calDay: {
    width: `${100 / 7 - 0.6}%` as any,
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#3a2820',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  calDayHasMenu: {
    borderColor: 'rgba(122,171,114,0.25)',
  },
  calDayLivraison: {
    borderColor: '#9b7060',
    backgroundColor: '#fff8f5',
  },
  calDayBatch: {
    borderColor: '#d4a843',
    backgroundColor: '#fffbf0',
  },
  calDayBirthday: {
    borderColor: '#e8899a',
    backgroundColor: '#fff0f4',
  },
  calDayToday: {
    backgroundColor: '#c45c78',
    borderColor: '#c45c78',
    shadowColor: '#c45c78',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  calDayNum: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3a2820',
  },
  calDayNumToday: { color: '#fff' },
  calDayIcon: { fontSize: 9, marginTop: 1 },
  calDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7aab72',
    marginTop: 2,
  },

  // Légende
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 3,
  },
  legendIcon: { fontSize: 10 },
  legendText: { fontSize: 10, color: '#9b7060' },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(58,32,48,0.45)',
  },
  modalPanel: {
    backgroundColor: '#faf6f3',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    paddingTop: 8,
    shadowColor: '#3a2030',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(58,40,32,0.12)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalClose: {
    position: 'absolute',
    right: 16,
    top: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(58,40,32,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: { fontSize: 14, color: '#9b7060' },

  // Panneau détail
  panelHeader: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  panelDate: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#9b7060',
    fontWeight: '700',
    marginBottom: 4,
  },
  modeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  modeBadgeText: { fontSize: 11, fontWeight: '700' },

  specialBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 12,
    backgroundColor: '#f5ede8',
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  bdayBanner: {
    backgroundColor: '#fdf0f4',
    borderColor: 'rgba(232,137,154,0.25)',
  },
  livraisonBanner: {
    backgroundColor: '#f5ede8',
    borderColor: 'rgba(155,112,96,0.2)',
  },
  batchBanner: {
    backgroundColor: '#fdf8e8',
    borderColor: 'rgba(212,168,67,0.2)',
  },
  specialBannerText: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
  },

  nextMealBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ede8f8',
    borderWidth: 1,
    borderColor: 'rgba(124,92,191,0.15)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nextMealIcon: { fontSize: 20 },
  nextMealLabel: { fontSize: 10, color: '#7c5cbf', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  nextMealTitle: { fontSize: 13, color: '#3a2820', fontWeight: '600', marginTop: 2 },
  nextMealTime: { fontSize: 12, color: '#7c5cbf', fontWeight: '400' },

  mealsContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },

  sjsrAlert: {
    margin: 16,
    backgroundColor: 'rgba(124,92,191,0.06)',
    borderLeftWidth: 3,
    borderLeftColor: '#7c5cbf',
    borderRadius: 8,
    padding: 12,
  },
  sjsrAlertTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7c5cbf',
    marginBottom: 4,
  },
  sjsrAlertText: {
    fontSize: 12,
    color: '#3a2820',
    lineHeight: 18,
  },
});
