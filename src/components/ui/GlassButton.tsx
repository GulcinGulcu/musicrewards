import React, { useMemo } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import { ThemeMode } from "../../types";

interface GlassButtonProps {
  icon?: React.ReactNode;
  title?: string | null;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean
}

export default function GlassButton({
  icon,
  onPress,
  style,
  disabled
}: GlassButtonProps) {
  const { mode } = useThemeStore();
  const styles = useMemo(() => getStyles(mode), [mode]);

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.85} disabled={disabled}>
      {icon}
    </TouchableOpacity>
  );
}

const getStyles = (mode: ThemeMode) =>
  StyleSheet.create({
    button: {
      borderRadius: 50,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        mode === "dark"
          ? "rgba(255, 255, 255, 0.08)" 
          : "rgba(0, 0, 0, 0.05)",
      borderColor:
        mode === "dark"
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(0, 0, 0, 0.12)",
      borderWidth: 1,
      shadowColor: mode === "dark" ? "#000" : "#B0B0B0",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: mode === "dark" ? 0.6 : 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  });
