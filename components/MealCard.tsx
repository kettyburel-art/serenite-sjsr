import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Meal } from '@/lib/types';
import { NutriTagBadge } from './NutriTag';

const MEAL_ICONS: Record<string, string> = {
  matin:  '☀️',
  midi:   '🌿',
  gouter: '🌸',
  diner:  '🌙',
  snack:  '🍎',
};

const MEAL_LABELS: Record<string, string> = {
  matin:  'Matin',
  midi:   'Déjeuner',
  gouter: 'Goûter',
  diner:  'Dîner',
  snack:  'Collation',
};

const MEAL_BG: Record<string, string> = {
  matin:  '#fdf8e8',
  midi:   '#edf5ed',
  gouter: '#fdf0f4',
  diner:  '#f5f0f8',
  snack:  '#fdf5f0',
};

interface Props {
  meal: Meal;
  isBirthday?: boolean;
}

export function MealCard({ meal, isBirthday }: Props) {
  const [expanded, setExpanded] = useState(true);
  const icon = MEAL_ICONS[meal.type] || '🍽️';
  const label = MEAL_LABELS[meal.type] || meal.type;
  const bgColor = isBirthday ? '#fff5f8' : MEAL_BG[meal.type] || '#fff';

  return (
    <View style={[styles.card, { borderColor: isBirthday ? '#e8899a' : '#ede0d8' }]}>
      {/* En-tête */}
      <Pressable
        onPress={() => setExpanded(e => !e)}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.8 : 1 }]}
      >
        <View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.mealLabel}>{label}</Text>
          {meal.time && <Text style={styles.mealTime}>{meal.time}</Text>}
        </View>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </Pressable>

      {/* Corps */}
      {expanded && (
        <View style={styles.body}>
          {/* Pause TDAH */}
          {meal.tdahPause && (
            <View style={styles.tdahPause}>
              <Text style={styles.tdahPauseText}>🧠 {meal.tdahPause}</Text>
            </View>
          )}

          {/* Titre du repas */}
          <Text style={styles.mealTitle}>{meal.title}</Text>

          {/* Ingrédients */}
          <View style={styles.ingrList}>
            {meal.ingredients.map((ingr, i) => (
              <View
                key={i}
                style={[
                  styles.ingrTag,
                  ingr.isFresh && styles.ingrFresh,
                  ingr.isBirthday && styles.ingrBday,
                ]}
              >
                <Text style={[
                  styles.ingrText,
                  ingr.isFresh && styles.ingrTextFresh,
                  ingr.isBirthday && styles.ingrTextBday,
                ]}>
                  {ingr.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Tags nutritionnels */}
          {meal.nutriTags.length > 0 && (
            <View style={styles.tagsRow}>
              {meal.nutriTags.map(tag => (
                <NutriTagBadge key={tag} tag={tag} />
              ))}
            </View>
          )}

          {/* Conseil */}
          {meal.conseil && (
            <View style={styles.conseil}>
              <Text style={styles.conseilIcon}>💡</Text>
              <Text style={styles.conseilText}>{meal.conseil}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ede0d8',
    shadowColor: '#3a2820',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 18 },
  headerText: { flex: 1 },
  mealLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9b7060',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  mealTime: {
    fontSize: 12,
    color: '#9b7060',
    marginTop: 1,
  },
  chevron: {
    fontSize: 10,
    color: '#9b7060',
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  tdahPause: {
    backgroundColor: '#ede8f8',
    borderLeftWidth: 2,
    borderLeftColor: '#a98de0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  tdahPauseText: {
    fontSize: 12,
    color: '#7c5cbf',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a2820',
    marginBottom: 8,
    lineHeight: 22,
  },
  ingrList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 8,
  },
  ingrTag: {
    backgroundColor: '#faf6f3',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  ingrFresh: {
    borderColor: '#a8c89a',
    backgroundColor: '#f0f8ee',
  },
  ingrBday: {
    borderColor: '#e8899a',
    backgroundColor: '#fdf0f4',
  },
  ingrText: {
    fontSize: 12,
    color: '#3a2820',
  },
  ingrTextFresh: {
    color: '#5a8a5a',
  },
  ingrTextBday: {
    color: '#c45c78',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  conseil: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#faf6f3',
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
  conseilIcon: { fontSize: 14 },
  conseilText: {
    flex: 1,
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
  },
});
