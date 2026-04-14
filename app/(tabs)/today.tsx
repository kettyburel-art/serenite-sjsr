import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MealCard } from '@/components/MealCard';
import { getDayData, getNextMeal } from '@/lib/menus';
import type { DayData } from '@/lib/types';

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTH_NAMES = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const todayStr = formatDate(today);
  const [dayData, setDayData] = useState<DayData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setDayData(getDayData(todayStr));
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [todayStr]);

  const dayName = DAY_NAMES[today.getDay()];
  const monthName = MONTH_NAMES[today.getMonth()];
  const dateLabel = `${dayName} ${today.getDate()} ${monthName} ${today.getFullYear()}`;

  const nextMeal = dayData ? getNextMeal(dayData) : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.flowerDeco}>🌸</Text>
        <Text style={styles.headerDate}>{dateLabel}</Text>
        <Text style={styles.headerTitle}>Mes repas du jour</Text>
        <Text style={styles.headerTime}>
          {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {dayData ? (
          <>
            {/* Mode spécial */}
            {dayData.mode !== 'normal' && (
              <View style={[
                styles.modeBanner,
                dayData.mode === 'birthday' && styles.bdayBanner,
                dayData.mode === 'livraison' && styles.livraisonBanner,
                dayData.mode === 'batch' && styles.batchBanner,
              ]}>
                <Text style={styles.modeBannerText}>
                  {dayData.mode === 'birthday' ? '🎂' : dayData.mode === 'livraison' ? '📦' : '🍳'}
                  {' '}{dayData.specialNote}
                </Text>
              </View>
            )}

            {/* Prochain repas */}
            {nextMeal && (
              <View style={styles.nextMealCard}>
                <View style={styles.nextMealLeft}>
                  <Text style={styles.nextMealLabel}>⏰ Prochain repas</Text>
                  <Text style={styles.nextMealTitle}>{nextMeal.meal.title}</Text>
                </View>
                <View style={styles.nextMealRight}>
                  <Text style={styles.nextMealTime}>{nextMeal.label}</Text>
                  <Text style={styles.nextMealHour}>{nextMeal.meal.time}</Text>
                </View>
              </View>
            )}

            {/* Alerte SJSR */}
            {dayData.sjsrAlert && (
              <View style={styles.sjsrAlert}>
                <Text style={styles.sjsrTitle}>🦵 Rappel SJSR</Text>
                <Text style={styles.sjsrText}>{dayData.sjsrAlert}</Text>
              </View>
            )}

            {/* Repas */}
            <View style={styles.mealsSection}>
              <Text style={styles.sectionTitle}>Mes repas</Text>
              <View style={styles.mealsList}>
                {dayData.meals.map((meal, i) => (
                  <MealCard
                    key={i}
                    meal={meal}
                    isBirthday={dayData.mode === 'birthday'}
                  />
                ))}
              </View>
            </View>

            {/* Conseils nutritionnels du jour */}
            <View style={styles.nutritionCard}>
              <Text style={styles.nutritionTitle}>🌿 Nutrition anti-SJSR du jour</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionIcon}>🩸</Text>
                  <Text style={styles.nutritionLabel}>Fer</Text>
                  <Text style={styles.nutritionValue}>
                    {dayData.meals.filter(m => m.nutriTags.includes('fer')).length} repas
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionIcon}>💚</Text>
                  <Text style={styles.nutritionLabel}>Magnésium</Text>
                  <Text style={styles.nutritionValue}>
                    {dayData.meals.filter(m => m.nutriTags.includes('mag')).length} repas
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionIcon}>🐟</Text>
                  <Text style={styles.nutritionLabel}>Oméga-3</Text>
                  <Text style={styles.nutritionValue}>
                    {dayData.meals.filter(m => m.nutriTags.includes('omega3')).length} repas
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionIcon}>🧠</Text>
                  <Text style={styles.nutritionLabel}>TDAH</Text>
                  <Text style={styles.nutritionValue}>
                    {dayData.meals.filter(m => m.nutriTags.includes('tdah')).length} repas
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* Pas de menu pour aujourd'hui */
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌸</Text>
            <Text style={styles.emptyTitle}>Aucun menu planifié</Text>
            <Text style={styles.emptyText}>
              Aucun repas n'est planifié pour aujourd'hui ({todayStr}).
              Consultez le calendrier pour voir les jours avec des menus.
            </Text>
            <View style={styles.emptyTips}>
              <Text style={styles.emptyTipsTitle}>💡 Rappels anti-SJSR</Text>
              <Text style={styles.emptyTip}>• Privilégier les aliments riches en fer et magnésium</Text>
              <Text style={styles.emptyTip}>• Éviter la caféine après 14h</Text>
              <Text style={styles.emptyTip}>• Dîner léger, au moins 3h avant le coucher</Text>
              <Text style={styles.emptyTip}>• Étirements doux des jambes avant de dormir</Text>
            </View>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
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
    right: -8,
    top: -8,
    fontSize: 72,
    opacity: 0.08,
  },
  headerDate: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 22,
    color: '#f2c4ce',
    fontStyle: 'italic',
    fontWeight: '400',
    marginTop: 2,
  },
  headerTime: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    marginTop: 4,
    opacity: 0.9,
  },

  modeBanner: {
    margin: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 12,
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
  modeBannerText: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
  },

  nextMealCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ede8f8',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(124,92,191,0.15)',
  },
  nextMealLeft: { flex: 1 },
  nextMealLabel: {
    fontSize: 10,
    color: '#7c5cbf',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nextMealTitle: {
    fontSize: 14,
    color: '#3a2820',
    fontWeight: '600',
    marginTop: 3,
    lineHeight: 20,
  },
  nextMealRight: { alignItems: 'flex-end' },
  nextMealTime: {
    fontSize: 13,
    color: '#7c5cbf',
    fontWeight: '700',
  },
  nextMealHour: {
    fontSize: 12,
    color: '#9b7060',
    marginTop: 2,
  },

  sjsrAlert: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(124,92,191,0.06)',
    borderLeftWidth: 3,
    borderLeftColor: '#7c5cbf',
    borderRadius: 8,
    padding: 12,
  },
  sjsrTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7c5cbf',
    marginBottom: 4,
  },
  sjsrText: {
    fontSize: 12,
    color: '#3a2820',
    lineHeight: 18,
  },

  mealsSection: { marginHorizontal: 16, marginBottom: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3a2820',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  mealsList: { gap: 10 },

  nutritionCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  nutritionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionIcon: { fontSize: 20, marginBottom: 4 },
  nutritionLabel: { fontSize: 10, color: '#9b7060', fontWeight: '600' },
  nutritionValue: { fontSize: 12, color: '#3a2820', fontWeight: '700', marginTop: 2 },

  emptyState: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3a2820',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: '#9b7060',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  emptyTips: {
    width: '100%',
    backgroundColor: '#faf6f3',
    borderRadius: 12,
    padding: 14,
  },
  emptyTipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 8,
  },
  emptyTip: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 20,
  },
});
