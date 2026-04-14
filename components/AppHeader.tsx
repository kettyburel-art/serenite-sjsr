import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  budgetSpent: number;
  budgetTotal: number;
  sjsrAlert?: string;
}

export function AppHeader({ budgetSpent, budgetTotal, sjsrAlert }: Props) {
  const percent = Math.min(100, Math.round((budgetSpent / budgetTotal) * 100));
  const remaining = budgetTotal - budgetSpent;
  const isOverBudget = budgetSpent > budgetTotal;

  return (
    <View style={styles.header}>
      {/* Décoration florale */}
      <Text style={styles.flowerDeco}>🌸</Text>

      {/* Titre */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          <Text style={styles.titleItalic}>Sérénité</Text>
          {'  '}
          <Text style={styles.tdahBadge}>SJSR · TDAH</Text>
        </Text>
      </View>
      <Text style={styles.subtitle}>PLANIFICATION · BIEN-ÊTRE · NUTRITION</Text>

      {/* Barre budget */}
      <View style={styles.budgetBar}>
        <Text style={styles.budgetLabel}>BUDGET AVRIL</Text>
        <View style={styles.budgetTrack}>
          <View
            style={[
              styles.budgetFill,
              { width: `${percent}%` as any },
              isOverBudget && styles.budgetFillOver,
            ]}
          />
        </View>
        <Text style={styles.budgetAmount}>
          <Text style={styles.budgetRemaining}>
            {remaining.toFixed(0)}€
          </Text>
          {' '}/ {budgetTotal}€
        </Text>
      </View>

      {/* Alerte SJSR */}
      {sjsrAlert && (
        <View style={styles.alertBar}>
          <Text style={styles.alertText}>
            <Text style={styles.alertBold}>🦵 SJSR · </Text>
            {sjsrAlert}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3a2030',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  flowerDeco: {
    position: 'absolute',
    right: -8,
    top: -8,
    fontSize: 72,
    opacity: 0.08,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  titleItalic: {
    color: '#f2c4ce',
    fontStyle: 'italic',
    fontSize: 20,
  },
  tdahBadge: {
    fontSize: 10,
    backgroundColor: 'rgba(124,92,191,0.3)',
    color: '#d4c4f8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 2,
    marginBottom: 10,
  },
  budgetBar: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  budgetLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    minWidth: 60,
  },
  budgetTrack: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    height: 5,
    overflow: 'hidden',
  },
  budgetFill: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#a8c89a',
  },
  budgetFillOver: {
    backgroundColor: '#e8899a',
  },
  budgetAmount: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  budgetRemaining: {
    color: '#fff',
    fontWeight: '700',
  },
  alertBar: {
    marginTop: 10,
    backgroundColor: 'rgba(242,196,206,0.15)',
    borderLeftWidth: 3,
    borderLeftColor: '#e8899a',
    borderRadius: 8,
    padding: 8,
  },
  alertText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 17,
  },
  alertBold: {
    color: '#f2c4ce',
    fontWeight: '700',
  },
});
