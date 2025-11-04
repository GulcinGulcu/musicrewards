import { TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, gradientColors } from "../../constants/theme";

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

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 44,
    shadowColor: COLORS.secondary,
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
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.6,
    textShadowColor: "rgba(255, 50, 100, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
