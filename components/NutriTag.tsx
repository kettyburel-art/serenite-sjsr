import React from 'react';
import { Text, View } from 'react-native';
import type { NutriTag as NutriTagType } from '@/lib/types';

const TAG_CONFIG: Record<NutriTagType, { label: string; bg: string; color: string }> = {
  fer:    { label: '🩸 Fer',       bg: '#f5ede8', color: '#6b4c3b' },
  mag:    { label: '💚 Magnésium', bg: '#edf5ed', color: '#3a6a3a' },
  alk:    { label: '🌿 Alcalin',   bg: '#e8f5e8', color: '#3a6a3a' },
  vitc:   { label: '🍋 Vit. C',   bg: '#fdf5e0', color: '#8a6800' },
  fun:    { label: '✨ Plaisir',   bg: '#fdf0f4', color: '#c45c78' },
  bday:   { label: '🎂 Fête',      bg: '#fde8f0', color: '#c45c78' },
  dopa:   { label: '⚡ Dopamine',  bg: '#fdf0e8', color: '#e07840' },
  tdah:   { label: '🧠 TDAH',     bg: '#ede8f8', color: '#7c5cbf' },
  omega3: { label: '🐟 Oméga-3',  bg: '#e8f0f8', color: '#2060a0' },
  zinc:   { label: '🔬 Zinc',     bg: '#f0f0f0', color: '#606060' },
  b12:    { label: '💊 B12',      bg: '#f8e8f8', color: '#8040a0' },
};

interface Props {
  tag: NutriTagType;
}

export function NutriTagBadge({ tag }: Props) {
  const config = TAG_CONFIG[tag];
  if (!config) return null;

  return (
    <View
      style={{
        backgroundColor: config.bg,
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
      }}
    >
      <Text style={{ fontSize: 11, fontWeight: '700', color: config.color, letterSpacing: 0.3 }}>
        {config.label}
      </Text>
    </View>
  );
}
