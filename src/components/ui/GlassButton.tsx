import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

interface TransParentBgButton {
  title?: string;
  icon?: React.ReactNode;
  onPress: () => void;
}

export default function GlassButton({
  title,
  onPress,
  icon,
}: TransParentBgButton) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.button}
    >
      {icon && <View>{icon}</View>}
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
