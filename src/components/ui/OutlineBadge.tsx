import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import { ThemeColors } from "../../types";

interface OutlineBadgeProps {
  label: "easy" | "medium" | "hard" | undefined;
}

export default function OutlineBadge({ label }: OutlineBadgeProps) {
  const { colors } = useThemeStore();

  // Recreate styles only when colors change
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    badge: {
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: 4,
      paddingHorizontal: 10,
      alignSelf: "flex-start",
      borderColor: colors.primary,
    },
    text: {
      fontSize: 13,
      fontWeight: "400",
      letterSpacing: 0.4,
      textTransform: "uppercase",
      color: colors.text,
    },
  });
