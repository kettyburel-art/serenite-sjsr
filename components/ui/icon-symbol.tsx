// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols → Material Icons mapping for Sérénité app
 */
const MAPPING = {
  // Navigation
  "house.fill":                           "home",
  "calendar":                             "calendar-today",
  "fork.knife":                           "restaurant",
  "brain.head.profile":                   "psychology",
  "chart.bar.fill":                       "bar-chart",
  "gearshape.fill":                       "settings",
  // Actions
  "paperplane.fill":                      "send",
  "plus":                                 "add",
  "plus.circle.fill":                     "add-circle",
  "minus.circle.fill":                    "remove-circle",
  "checkmark.circle.fill":               "check-circle",
  "xmark.circle.fill":                   "cancel",
  "trash.fill":                           "delete",
  "pencil":                               "edit",
  "chevron.left":                         "chevron-left",
  "chevron.right":                        "chevron-right",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.up":                           "expand-less",
  "chevron.down":                         "expand-more",
  "arrow.left":                           "arrow-back",
  "arrow.right":                          "arrow-forward",
  // Content
  "heart.fill":                           "favorite",
  "star.fill":                            "star",
  "bell.fill":                            "notifications",
  "bell.slash.fill":                      "notifications-off",
  "moon.fill":                            "nightlight",
  "sun.max.fill":                         "wb-sunny",
  "leaf.fill":                            "eco",
  "drop.fill":                            "water-drop",
  "timer":                                "timer",
  "clock.fill":                           "schedule",
  "person.fill":                          "person",
  "info.circle.fill":                     "info",
  "exclamationmark.triangle.fill":        "warning",
  "list.bullet":                          "list",
  "cart.fill":                            "shopping-cart",
  "creditcard.fill":                      "credit-card",
  "eurosign.circle.fill":                 "euro",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
