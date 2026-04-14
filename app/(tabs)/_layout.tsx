import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 58 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#c45c78',
        tabBarInactiveTintColor: '#9b7060',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: '#fff',
          borderTopColor: '#ede0d8',
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendrier",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Aujourd'hui",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="fork.knife" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Outils TDAH",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="brain.head.profile" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="chart.bar.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Réglages",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
