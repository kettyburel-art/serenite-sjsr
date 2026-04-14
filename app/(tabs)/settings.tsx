import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Switch,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { loadSettings, saveSettings, DEFAULT_SETTINGS } from '@/lib/store';
import type { AppSettings } from '@/lib/types';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [budgetInput, setBudgetInput] = useState('350');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings().then(s => {
      setSettings(s);
      setBudgetInput(s.monthlyBudget.toString());
    });
  }, []);

  const handleSave = async () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const newSettings: AppSettings = {
      ...settings,
      monthlyBudget: parseFloat(budgetInput) || 350,
    };
    await saveSettings(newSettings);
    setSettings(newSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleReminders = (value: boolean) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSettings(s => ({ ...s, remindersEnabled: value }));
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.flowerDeco}>⚙️</Text>
        <Text style={styles.headerTitle}>Réglages</Text>
        <Text style={styles.headerSub}>PERSONNALISATION · PRÉFÉRENCES</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Budget */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💶 Budget mensuel</Text>
          <Text style={styles.cardDesc}>
            Définissez votre budget alimentaire mensuel pour le suivi des dépenses.
          </Text>
          <View style={styles.budgetRow}>
            <TextInput
              style={styles.budgetInput}
              value={budgetInput}
              onChangeText={setBudgetInput}
              keyboardType="numeric"
              returnKeyType="done"
              placeholder="350"
              placeholderTextColor="#9b7060"
            />
            <Text style={styles.budgetCurrency}>€ / mois</Text>
          </View>
        </View>

        {/* Rappels */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardRowLeft}>
              <Text style={styles.cardTitle}>🔔 Rappels repas</Text>
              <Text style={styles.cardDesc}>
                Recevoir des notifications pour chaque repas planifié.
              </Text>
            </View>
            <Switch
              value={settings.remindersEnabled}
              onValueChange={toggleReminders}
              trackColor={{ false: '#ede0d8', true: '#c45c78' }}
              thumbColor="#fff"
            />
          </View>

          {settings.remindersEnabled && (
            <View style={styles.reminderTimes}>
              {[
                { key: 'matin', label: '☀️ Matin' },
                { key: 'midi', label: '🌿 Déjeuner' },
                { key: 'gouter', label: '🌸 Goûter' },
                { key: 'diner', label: '🌙 Dîner' },
              ].map(({ key, label }) => (
                <View key={key} style={styles.reminderRow}>
                  <Text style={styles.reminderLabel}>{label}</Text>
                  <TextInput
                    style={styles.reminderInput}
                    value={settings.reminderTimes[key as keyof typeof settings.reminderTimes]}
                    onChangeText={val =>
                      setSettings(s => ({
                        ...s,
                        reminderTimes: { ...s.reminderTimes, [key]: val },
                      }))
                    }
                    placeholder="07:30"
                    placeholderTextColor="#9b7060"
                    returnKeyType="done"
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Informations SJSR */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🦵 Syndrome des Jambes Sans Repos</Text>
          <Text style={styles.infoText}>
            Le SJSR est un trouble neurologique caractérisé par des sensations désagréables dans les jambes, 
            surtout la nuit. Une alimentation riche en fer, magnésium et oméga-3 peut réduire les symptômes.
          </Text>
          <View style={styles.infoTags}>
            <View style={styles.infoTag}>
              <Text style={styles.infoTagText}>🩸 Fer</Text>
            </View>
            <View style={styles.infoTag}>
              <Text style={styles.infoTagText}>💚 Magnésium</Text>
            </View>
            <View style={styles.infoTag}>
              <Text style={styles.infoTagText}>🐟 Oméga-3</Text>
            </View>
            <View style={styles.infoTag}>
              <Text style={styles.infoTagText}>🍋 Vitamine C</Text>
            </View>
          </View>
        </View>

        {/* Informations TDAH */}
        <View style={[styles.infoCard, styles.tdahCard]}>
          <Text style={[styles.infoTitle, { color: '#7c5cbf' }]}>🧠 TDAH & Alimentation</Text>
          <Text style={styles.infoText}>
            Le TDAH (Trouble Déficit de l'Attention avec ou sans Hyperactivité) peut être mieux géré 
            avec une alimentation stable : repas réguliers, protéines le matin, réduction du sucre raffiné.
          </Text>
          <View style={styles.infoTags}>
            <View style={[styles.infoTag, { backgroundColor: '#ede8f8' }]}>
              <Text style={[styles.infoTagText, { color: '#7c5cbf' }]}>⚡ Dopamine</Text>
            </View>
            <View style={[styles.infoTag, { backgroundColor: '#ede8f8' }]}>
              <Text style={[styles.infoTagText, { color: '#7c5cbf' }]}>🥚 Protéines</Text>
            </View>
            <View style={[styles.infoTag, { backgroundColor: '#ede8f8' }]}>
              <Text style={[styles.infoTagText, { color: '#7c5cbf' }]}>🌾 Index glycémique bas</Text>
            </View>
          </View>
        </View>

        {/* Bouton sauvegarder */}
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.saveBtnText}>
            {saved ? '✅ Sauvegardé !' : '💾 Sauvegarder les réglages'}
          </Text>
        </Pressable>

        {/* À propos */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>🌸 Sérénité</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <Text style={styles.aboutDesc}>
            Application de planification alimentaire et de gestion du bien-être pour les personnes 
            vivant avec le SJSR et/ou le TDAH. Conçue avec amour pour une vie plus sereine.
          </Text>
          <Text style={styles.aboutDisclaimer}>
            ⚠️ Cette application est un outil de bien-être et ne remplace pas un avis médical professionnel.
          </Text>
        </View>

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

  card: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardRowLeft: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 12,
    color: '#9b7060',
    lineHeight: 18,
    marginBottom: 12,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  budgetInput: {
    flex: 1,
    backgroundColor: '#faf6f3',
    borderRadius: 10,
    padding: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#3a2820',
    borderWidth: 1,
    borderColor: '#ede0d8',
    textAlign: 'center',
  },
  budgetCurrency: {
    fontSize: 14,
    color: '#9b7060',
    fontWeight: '600',
  },

  reminderTimes: {
    marginTop: 12,
    gap: 8,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reminderLabel: {
    fontSize: 13,
    color: '#3a2820',
    fontWeight: '600',
  },
  reminderInput: {
    backgroundColor: '#faf6f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    color: '#3a2820',
    borderWidth: 1,
    borderColor: '#ede0d8',
    minWidth: 70,
    textAlign: 'center',
  },

  infoCard: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: '#f5ede8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(155,112,96,0.2)',
  },
  tdahCard: {
    backgroundColor: '#ede8f8',
    borderColor: 'rgba(124,92,191,0.15)',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b4c3b',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
    marginBottom: 10,
  },
  infoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  infoTag: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(155,112,96,0.15)',
  },
  infoTagText: {
    fontSize: 11,
    color: '#6b4c3b',
    fontWeight: '600',
  },

  saveBtn: {
    margin: 16,
    backgroundColor: '#c45c78',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  aboutCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ede0d8',
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    color: '#c45c78',
    fontStyle: 'italic',
    fontWeight: '400',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 11,
    color: '#9b7060',
    marginBottom: 10,
  },
  aboutDesc: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  aboutDisclaimer: {
    fontSize: 11,
    color: '#9b7060',
    lineHeight: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
