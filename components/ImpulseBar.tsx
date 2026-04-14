import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface ImpulseAction {
  icon: string;
  label: string;
  onPress: () => void;
}

interface Props {
  actions: ImpulseAction[];
}

export function ImpulseBar({ actions }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>⚡ IMPULSION RAPIDE</Text>
      </View>
      <View style={styles.buttonsRow}>
        {actions.map((action, i) => (
          <Pressable
            key={i}
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonIcon}>{action.icon}</Text>
            <Text style={styles.buttonLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ede8f8',
    borderWidth: 1.5,
    borderColor: 'rgba(124,92,191,0.2)',
    borderRadius: 14,
    padding: 12,
  },
  titleRow: {
    marginBottom: 8,
  },
  title: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#7c5cbf',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'rgba(124,92,191,0.15)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    minWidth: 70,
  },
  buttonPressed: {
    backgroundColor: '#ede8f8',
    transform: [{ scale: 0.96 }],
  },
  buttonIcon: {
    fontSize: 18,
    marginBottom: 3,
  },
  buttonLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7c5cbf',
    textAlign: 'center',
    lineHeight: 13,
  },
});
