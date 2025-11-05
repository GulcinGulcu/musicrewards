import React, { ReactNode, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import NeonButton from "./ui/NeonButton";
import { useThemeStore } from "../stores/themeStore";
import { ThemeColors } from "../types";

type BaseModalProps = {
  title: string;
  message: string;
  trackInfo?: string;
  buttonLabel: string;
  onClose: () => void;
  children?: ReactNode;
};

export default function BaseModal({
  title,
  message,
  trackInfo,
  buttonLabel,
  onClose,
  children,
}: BaseModalProps) {
  const { colors } = useThemeStore();

  // Recreate styles only when theme changes
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{message}</Text>
        {trackInfo ? <Text style={styles.modalTrackInfo}>{trackInfo}</Text> : null}
        <NeonButton title={buttonLabel} onPress={onClose} />
      </View>
      {children}
    </View>
  );
}

// Dynamic StyleSheet
const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 22,
      width: "90%",
      alignItems: "center",
      paddingVertical: 42,
      elevation: 6,
    },
    modalTitle: {
      color: colors.text,
      fontSize: 25,
      fontWeight: "600",
      marginBottom: 12,
      textAlign: "center",
    },
    modalText: {
      color: colors.text,
      fontSize: 16,
      marginBottom: 32,
      fontWeight: "400",
      textAlign: "center",
    },
    modalTrackInfo: {
      color: colors.grey,
      marginBottom: 24,
      fontSize: 18,
      textAlign: "center",
    },
  });
