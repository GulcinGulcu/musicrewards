import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

interface OutlineBadgeProps {
  label: "easy" | "medium" | "hard" | undefined;
}

export default function OutlineBadge({ label }: OutlineBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: COLORS.white,
  },
});
