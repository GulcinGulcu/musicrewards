import React, { useMemo } from "react";
import {
  TouchableOpacity,
  ViewStyle,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeStore } from "../../stores/themeStore";
import { gradientColors } from "../../constants/theme";
import { ThemeColors } from "../../types";

interface NeonButtonProps {
  title?: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function NeonButton({
  title = "Neon Button",
  onPress,
  style,
}: NeonButtonProps) {
  const { colors } = useThemeStore();

  // Recreate styles only when colors change
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, style]}
      >
        <View style={styles.innerGlow}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Dynamic styles
const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      borderRadius: 50,
      paddingVertical: 14,
      paddingHorizontal: 44,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 15,
    },
    innerGlow: {
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.6,
      textShadowColor: "rgba(255, 50, 100, 0.9)",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
  });
