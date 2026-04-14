import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { loadImpulses, addImpulse, resolveImpulse, deleteImpulse } from '@/lib/store';
import type { ImpulseEntry } from '@/lib/types';

const BREATHING_STEPS = [
  { label: 'Inspirez', duration: 4, color: '#a8c89a' },
  { label: 'Retenez', duration: 4, color: '#d4a843' },
  { label: 'Expirez', duration: 6, color: '#7c5cbf' },
  { label: 'Retenez', duration: 2, color: '#e8899a' },
];

const TECHNIQUES = [
  {
    icon: '🧊',
    title: 'Règle des 24h',
    description: 'Avant tout achat impulsif, attends 24 heures. Si tu y penses encore demain, c\'est peut-être un vrai besoin.',
    color: '#e8f0f8',
    borderColor: '#a0c0e0',
  },
  {
    icon: '💶',
    title: 'Règle des 10€',
    description: 'Pour chaque tranche de 10€ à dépenser, attends 1 heure. 50€ = 5 heures de réflexion.',
    color: '#fdf8e8',
    borderColor: '#d4a843',
  },
  {
    icon: '🌊',
    title: 'Surfer sur l\'envie',
    description: 'Observe l\'envie comme une vague. Elle monte, atteint un pic, puis redescend. Tu n\'as pas à agir dessus.',
    color: '#ede8f8',
    borderColor: '#7c5cbf',
  },
  {
    icon: '📦',
    title: 'Liste d\'envies',
    description: 'Note toutes tes envies ici. Reviens les voir dans 48h. Beaucoup auront disparu d\'elles-mêmes.',
    color: '#fdf0f4',
    borderColor: '#e8899a',
  },
];

export default function ToolsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'pause' | 'impulses' | 'breathing' | 'techniques'>('pause');

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(5 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respiration
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathStep, setBreathStep] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const breathRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Journal d'impulsions
  const [impulses, setImpulses] = useState<ImpulseEntry[]>([]);
  const [newImpulse, setNewImpulse] = useState('');
  const [newImpulseAmount, setNewImpulseAmount] = useState('');

  useEffect(() => {
    loadImpulses().then(setImpulses);
  }, []);

  // Timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) {
            setTimerRunning(false);
            setTimerDone(true);
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  const startTimer = (minutes: number) => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimerSeconds(minutes * 60);
    setTimerRunning(true);
    setTimerDone(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(5 * 60);
    setTimerDone(false);
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Respiration
  const startBreathing = useCallback(() => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBreathingActive(true);
    setBreathStep(0);
    setBreathCount(0);
    runBreathStep(0, 0);
  }, []);

  const runBreathStep = (step: number, count: number) => {
    const current = BREATHING_STEPS[step];
    breathRef.current = setTimeout(() => {
      const nextStep = (step + 1) % BREATHING_STEPS.length;
      const nextCount = nextStep === 0 ? count + 1 : count;
      if (nextCount >= 4) {
        setBreathingActive(false);
        setBreathCount(4);
        if (Platform.OS !== 'web') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return;
      }
      setBreathStep(nextStep);
      setBreathCount(nextCount);
      runBreathStep(nextStep, nextCount);
    }, current.duration * 1000);
  };

  const stopBreathing = () => {
    if (breathRef.current) clearTimeout(breathRef.current);
    setBreathingActive(false);
  };

  // Journal
  const handleAddImpulse = async () => {
    if (!newImpulse.trim()) return;
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await addImpulse({
      description: newImpulse.trim(),
      amount: newImpulseAmount ? parseFloat(newImpulseAmount) : undefined,
    });
    setNewImpulse('');
    setNewImpulseAmount('');
    const updated = await loadImpulses();
    setImpulses(updated);
  };

  const handleResolve = async (id: string) => {
    await resolveImpulse(id);
    const updated = await loadImpulses();
    setImpulses(updated);
  };

  const handleDelete = async (id: string) => {
    await deleteImpulse(id);
    const updated = await loadImpulses();
    setImpulses(updated);
  };

  const tabs = [
    { id: 'pause', label: '⏸️ Pause', icon: '⏸️' },
    { id: 'impulses', label: '📝 Envies', icon: '📝' },
    { id: 'breathing', label: '🌬️ Respir.', icon: '🌬️' },
    { id: 'techniques', label: '🧠 Astuces', icon: '🧠' },
  ] as const;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.flowerDeco}>🧠</Text>
        <Text style={styles.headerTitle}>Outils TDAH</Text>
        <Text style={styles.headerSub}>RÉGULATION · IMPULSIONS · BIEN-ÊTRE</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {tabs.map(tab => (
          <Pressable
            key={tab.id}
            onPress={() => {
              if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(tab.id);
            }}
            style={[styles.tab, activeTab === tab.id && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Onglet Pause */}
        {activeTab === 'pause' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏸️ Minuteur de pause</Text>
            <Text style={styles.sectionDesc}>
              Quand tu te sens dépassé·e ou sur le point d'agir impulsivement, prends une pause chronométrée.
            </Text>

            <View style={styles.timerCard}>
              <Text style={[styles.timerDisplay, timerDone && styles.timerDone]}>
                {timerDone ? '✅ Terminé !' : formatTimer(timerSeconds)}
              </Text>

              {!timerRunning && !timerDone && (
                <View style={styles.timerButtons}>
                  {[2, 5, 10, 15].map(min => (
                    <Pressable
                      key={min}
                      onPress={() => startTimer(min)}
                      style={({ pressed }) => [styles.timerBtn, pressed && { opacity: 0.7 }]}
                    >
                      <Text style={styles.timerBtnText}>{min} min</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              {timerRunning && (
                <Pressable
                  onPress={() => setTimerRunning(false)}
                  style={({ pressed }) => [styles.timerStopBtn, pressed && { opacity: 0.7 }]}
                >
                  <Text style={styles.timerStopBtnText}>⏸ Pause</Text>
                </Pressable>
              )}

              {!timerRunning && timerSeconds < 5 * 60 && (
                <View style={styles.timerButtons}>
                  <Pressable
                    onPress={() => setTimerRunning(true)}
                    style={({ pressed }) => [styles.timerBtn, styles.timerBtnPrimary, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={[styles.timerBtnText, { color: '#fff' }]}>▶ Reprendre</Text>
                  </Pressable>
                  <Pressable
                    onPress={resetTimer}
                    style={({ pressed }) => [styles.timerBtn, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={styles.timerBtnText}>↺ Reset</Text>
                  </Pressable>
                </View>
              )}
            </View>

            <View style={styles.pauseTips}>
              <Text style={styles.pauseTipsTitle}>Pendant la pause :</Text>
              <Text style={styles.pauseTip}>🚶 Marche 5 minutes à l'extérieur</Text>
              <Text style={styles.pauseTip}>💧 Bois un grand verre d'eau</Text>
              <Text style={styles.pauseTip}>🌬️ Fais 4 cycles de respiration</Text>
              <Text style={styles.pauseTip}>📝 Note ce que tu ressens</Text>
            </View>
          </View>
        )}

        {/* Onglet Journal d'envies */}
        {activeTab === 'impulses' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Journal des envies</Text>
            <Text style={styles.sectionDesc}>
              Note tes envies impulsives ici. Reviens les voir dans 24-48h. La plupart auront disparu.
            </Text>

            {/* Formulaire */}
            <View style={styles.impulseForm}>
              <TextInput
                style={styles.impulseInput}
                placeholder="Décris ton envie..."
                placeholderTextColor="#9b7060"
                value={newImpulse}
                onChangeText={setNewImpulse}
                multiline
                returnKeyType="done"
              />
              <View style={styles.impulseFormRow}>
                <TextInput
                  style={[styles.impulseInput, styles.impulseAmountInput]}
                  placeholder="Montant (€)"
                  placeholderTextColor="#9b7060"
                  value={newImpulseAmount}
                  onChangeText={setNewImpulseAmount}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
                <Pressable
                  onPress={handleAddImpulse}
                  style={({ pressed }) => [styles.impulseAddBtn, pressed && { opacity: 0.7 }]}
                >
                  <Text style={styles.impulseAddBtnText}>+ Ajouter</Text>
                </Pressable>
              </View>
            </View>

            {/* Liste */}
            {impulses.length === 0 ? (
              <View style={styles.emptyImpulses}>
                <Text style={styles.emptyImpulsesIcon}>✨</Text>
                <Text style={styles.emptyImpulsesText}>Aucune envie enregistrée</Text>
              </View>
            ) : (
              <View style={styles.impulsesList}>
                {impulses.map(item => (
                  <View key={item.id} style={[styles.impulseItem, item.resolved && styles.impulseItemResolved]}>
                    <View style={styles.impulseItemLeft}>
                      <Text style={[styles.impulseItemText, item.resolved && styles.impulseItemTextResolved]}>
                        {item.description}
                      </Text>
                      {item.amount && (
                        <Text style={styles.impulseItemAmount}>{item.amount}€</Text>
                      )}
                      <Text style={styles.impulseItemDate}>
                        {new Date(item.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <View style={styles.impulseItemActions}>
                      {!item.resolved && (
                        <Pressable
                          onPress={() => handleResolve(item.id)}
                          style={({ pressed }) => [styles.impulseActionBtn, styles.impulseResolveBtn, pressed && { opacity: 0.7 }]}
                        >
                          <Text style={styles.impulseActionBtnText}>✓</Text>
                        </Pressable>
                      )}
                      <Pressable
                        onPress={() => handleDelete(item.id)}
                        style={({ pressed }) => [styles.impulseActionBtn, styles.impulseDeleteBtn, pressed && { opacity: 0.7 }]}
                      >
                        <Text style={styles.impulseActionBtnText}>✕</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Onglet Respiration */}
        {activeTab === 'breathing' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌬️ Respiration 4-4-6-2</Text>
            <Text style={styles.sectionDesc}>
              La cohérence cardiaque réduit le stress et améliore la concentration. 4 cycles complets.
            </Text>

            <View style={styles.breathingCard}>
              {!breathingActive ? (
                <>
                  <View style={styles.breathingCircle}>
                    <Text style={styles.breathingCircleText}>
                      {breathCount >= 4 ? '✅' : '🌬️'}
                    </Text>
                    <Text style={styles.breathingCircleLabel}>
                      {breathCount >= 4 ? 'Terminé !' : `${breathCount}/4 cycles`}
                    </Text>
                  </View>
                  <Pressable
                    onPress={startBreathing}
                    style={({ pressed }) => [styles.breathingStartBtn, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={styles.breathingStartBtnText}>
                      {breathCount >= 4 ? '↺ Recommencer' : '▶ Commencer'}
                    </Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <View style={[
                    styles.breathingCircle,
                    { backgroundColor: BREATHING_STEPS[breathStep].color + '30' },
                  ]}>
                    <Text style={styles.breathingCircleText}>
                      {BREATHING_STEPS[breathStep].label}
                    </Text>
                    <Text style={styles.breathingCircleLabel}>
                      {BREATHING_STEPS[breathStep].duration} secondes
                    </Text>
                  </View>
                  <Text style={styles.breathingProgress}>{breathCount}/4 cycles</Text>
                  <Pressable
                    onPress={stopBreathing}
                    style={({ pressed }) => [styles.breathingStopBtn, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={styles.breathingStopBtnText}>⏹ Arrêter</Text>
                  </Pressable>
                </>
              )}
            </View>

            <View style={styles.breathingSteps}>
              {BREATHING_STEPS.map((step, i) => (
                <View key={i} style={[
                  styles.breathingStep,
                  breathingActive && breathStep === i && styles.breathingStepActive,
                ]}>
                  <View style={[styles.breathingStepDot, { backgroundColor: step.color }]} />
                  <Text style={styles.breathingStepLabel}>{step.label}</Text>
                  <Text style={styles.breathingStepDuration}>{step.duration}s</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Onglet Techniques */}
        {activeTab === 'techniques' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧠 Techniques anti-impulsion</Text>
            <Text style={styles.sectionDesc}>
              Des stratégies éprouvées pour gérer les impulsions liées au TDAH.
            </Text>
            <View style={styles.techniquesList}>
              {TECHNIQUES.map((tech, i) => (
                <View key={i} style={[styles.techniqueCard, { backgroundColor: tech.color, borderColor: tech.borderColor }]}>
                  <Text style={styles.techniqueIcon}>{tech.icon}</Text>
                  <View style={styles.techniqueContent}>
                    <Text style={styles.techniqueTitle}>{tech.title}</Text>
                    <Text style={styles.techniqueDesc}>{tech.description}</Text>
                  </View>
                </View>
              ))}
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
    right: 16,
    top: 8,
    fontSize: 48,
    opacity: 0.15,
  },
  headerTitle: {
    fontSize: 22,
    color: '#d4c4f8',
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSub: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.38)',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(58,40,32,0.06)',
    margin: 12,
    borderRadius: 12,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#7c5cbf',
  },
  tabText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9b7060',
  },
  tabTextActive: {
    color: '#fff',
  },

  section: { paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 12,
    color: '#9b7060',
    lineHeight: 18,
    marginBottom: 16,
  },

  // Timer
  timerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ede0d8',
    marginBottom: 16,
  },
  timerDisplay: {
    fontSize: 56,
    fontWeight: '200',
    color: '#3a2820',
    letterSpacing: 2,
    marginBottom: 20,
  },
  timerDone: { color: '#5a8a5a', fontSize: 28, fontWeight: '600' },
  timerButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timerBtn: {
    backgroundColor: '#faf6f3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  timerBtnPrimary: {
    backgroundColor: '#7c5cbf',
    borderColor: '#7c5cbf',
  },
  timerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3a2820',
  },
  timerStopBtn: {
    backgroundColor: '#fdf0f4',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e8899a',
  },
  timerStopBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#c45c78',
  },
  pauseTips: {
    backgroundColor: '#ede8f8',
    borderRadius: 14,
    padding: 14,
  },
  pauseTipsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7c5cbf',
    marginBottom: 8,
  },
  pauseTip: {
    fontSize: 12,
    color: '#3a2820',
    lineHeight: 22,
  },

  // Journal
  impulseForm: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ede0d8',
    marginBottom: 16,
    gap: 8,
  },
  impulseInput: {
    backgroundColor: '#faf6f3',
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: '#3a2820',
    borderWidth: 1,
    borderColor: '#ede0d8',
    minHeight: 44,
  },
  impulseFormRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  impulseAmountInput: {
    flex: 1,
    minHeight: 44,
  },
  impulseAddBtn: {
    backgroundColor: '#7c5cbf',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  impulseAddBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  emptyImpulses: {
    alignItems: 'center',
    padding: 32,
  },
  emptyImpulsesIcon: { fontSize: 32, marginBottom: 8 },
  emptyImpulsesText: { fontSize: 14, color: '#9b7060' },
  impulsesList: { gap: 8 },
  impulseItem: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ede0d8',
  },
  impulseItemResolved: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  impulseItemLeft: { flex: 1 },
  impulseItemText: {
    fontSize: 13,
    color: '#3a2820',
    lineHeight: 18,
  },
  impulseItemTextResolved: {
    textDecorationLine: 'line-through',
    color: '#9b7060',
  },
  impulseItemAmount: {
    fontSize: 12,
    color: '#e07840',
    fontWeight: '700',
    marginTop: 3,
  },
  impulseItemDate: {
    fontSize: 10,
    color: '#9b7060',
    marginTop: 3,
  },
  impulseItemActions: {
    flexDirection: 'row',
    gap: 6,
  },
  impulseActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  impulseResolveBtn: { backgroundColor: '#edf5ed' },
  impulseDeleteBtn: { backgroundColor: '#fdf0f4' },
  impulseActionBtnText: { fontSize: 14, fontWeight: '700', color: '#3a2820' },

  // Respiration
  breathingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ede0d8',
    marginBottom: 16,
  },
  breathingCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#ede8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  breathingCircleText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3a2820',
    textAlign: 'center',
  },
  breathingCircleLabel: {
    fontSize: 12,
    color: '#7c5cbf',
    marginTop: 4,
  },
  breathingProgress: {
    fontSize: 14,
    color: '#9b7060',
    marginBottom: 12,
  },
  breathingStartBtn: {
    backgroundColor: '#7c5cbf',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  breathingStartBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  breathingStopBtn: {
    backgroundColor: '#fdf0f4',
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e8899a',
  },
  breathingStopBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#c45c78',
  },
  breathingSteps: {
    gap: 8,
  },
  breathingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ede0d8',
    gap: 10,
  },
  breathingStepActive: {
    borderColor: '#7c5cbf',
    backgroundColor: '#ede8f8',
  },
  breathingStepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breathingStepLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#3a2820',
  },
  breathingStepDuration: {
    fontSize: 12,
    color: '#9b7060',
    fontWeight: '700',
  },

  // Techniques
  techniquesList: { gap: 12 },
  techniqueCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
  },
  techniqueIcon: { fontSize: 28 },
  techniqueContent: { flex: 1 },
  techniqueTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3a2820',
    marginBottom: 6,
  },
  techniqueDesc: {
    fontSize: 12,
    color: '#6b4c3b',
    lineHeight: 18,
  },
});
